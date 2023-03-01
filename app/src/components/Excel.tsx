import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
// Required to save to cache 
import * as FileSystem from 'expo-file-system';
// ExcelJS
import ExcelJS from 'exceljs';
// Share excel via share dialog
import * as Sharing from 'expo-sharing';
// From @types/node/buffer
import { Buffer as NodeBuffer } from 'buffer';
import { getLogsByToday } from '../../services/logs/logs.services';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Excel(props: any) {
    const generateShareableExcel = async (): Promise<string> => {
        const date = new Date(props.date);
        const fileName = date.toISOString().substring(0,10)+'_etnamargement_Sheet.xlsx';
        const fileUri = FileSystem.cacheDirectory + fileName;
        return new Promise<string>(async (resolve, reject) => {
          const workbook = new ExcelJS.Workbook();
          workbook.creator = 'Etnamargment App';
          workbook.created = date;
          workbook.modified = date;
          // Add a sheet to work on
          const worksheet = workbook.addWorksheet('Etnamargement Sheet', {});
          // Just some columns as used on ExcelJS Readme
          worksheet.columns = [
            { header: 'Login', key: 'login', width: 15 },
            { header: 'Matin', key: 'matin', width: 10 },
            { header: 'Après-midi', key: 'apm', width: 10, },
            { header: 'Retard Matin', key: 'retard_morning', width: 20 },
						{ header: 'Retard Après-Midi', key: 'retard_apm', width: 20}
          ];
          // Add some test data
          let matin = '';
					let colorMatin = '';
					let colorApm = '';
					let apm = '';
					let retard_morning = '';
					let retard_apm = '';

					try {
					const logs = await getLogsByToday(date.toISOString().substring(0, 10));

					logs.data.forEach((element: any, index: number) => {
						retard_morning=' '
						retard_apm=' '
							switch (element.morning) {
							case 'Absent':
									matin = 'KO';
									colorMatin = 'e3a251';
									break;
							case 'Present':
									matin = 'OK';
									colorMatin = 'b6f0a6';
									break;
							case 'Retard':
									matin = 'OK';
									colorMatin = 'b6f0a6';
									retard_morning = element.hours_morning;
									break;
							case 'Distanciel':
									matin = 'Distance';
									colorMatin = 'c8b1c8';
									break;
							default:
									break;
							}

							switch (element.afternoon) {
							case 'Absent':
									apm = 'KO';
									colorApm = 'e3a251';
									break;
							case 'Present':
									apm = 'OK';
									colorApm = 'b6f0a6';
									break;
							case 'Retard':
									apm = 'OK';
									colorApm = 'b6f0a6';
									retard_apm = element.hours_afternoon;
									break;
							case 'Distanciel':
									apm = 'Distance';
									colorApm = 'c8b1c8';
									break;
							default:
									break;
							}

							worksheet.addRow({
								login: element.login,
								matin,
								apm,
								retard_morning,
								retard_apm
							});

							worksheet.getCell('B'+(index+2).toString()).fill = {
								type : 'pattern',
								pattern : 'solid',
								fgColor: { argb: colorMatin }
							};
							worksheet.getCell('C'+(index+2).toString()).fill = {
								type : 'pattern',
								pattern : 'solid',
								fgColor: { argb: colorApm }
							};

							worksheet.getCell(`B${index + 2}`).alignment = { vertical: 'middle', horizontal: 'center' };
    					worksheet.getCell(`C${index + 2}`).alignment = { vertical: 'middle', horizontal: 'center' };
							worksheet.getCell(`D${index + 2}`).alignment = { vertical: 'middle', horizontal: 'center' };
    					worksheet.getCell(`E${index + 2}`).alignment = { vertical: 'middle', horizontal: 'center' };

					});
					} catch (error) {
					console.error(error);
					}
					
      
          workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
            const nodeBuffer = NodeBuffer.from(buffer);
            const bufferStr = nodeBuffer.toString('base64');
            FileSystem.writeAsStringAsync(fileUri, bufferStr, {
              encoding: FileSystem.EncodingType.Base64
            }).then(() => {
              resolve(fileUri);
            });
          });
        });
      }

    const shareExcel = async () => {
        const shareableExcelUri: string = await generateShareableExcel();
        Sharing.shareAsync(shareableExcelUri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
          dialogTitle: "Your dialog title here", // Android and Web
          UTI: "com.microsoft.excel.xlsx", // iOS
        })
          .catch((error: any) => {
            console.error("Error", error);
          })
          .then(() => {
            console.log("Return from sharing dialog");
          });
      }
  return (
    <View>
			{console.log(props.date)}
      <Button title='Generate Excel' onPress={shareExcel} />
    </View>
  );
}
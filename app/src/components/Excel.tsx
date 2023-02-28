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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {

    const generateShareableExcel = async (): Promise<string> => {
        const now = new Date();
        const fileName = now.toISOString().substring(0,10)+'_etnamargement_Sheet.xlsx';
        const fileUri = FileSystem.cacheDirectory + fileName;
        return new Promise<string>(async (resolve, reject) => {
          const workbook = new ExcelJS.Workbook();
          workbook.creator = 'Etnamargment App';
          workbook.created = now;
          workbook.modified = now;
          // Add a sheet to work on
          const worksheet = workbook.addWorksheet('Etnamargement Sheet', {});
          // Just some columns as used on ExcelJS Readme
          worksheet.columns = [
            { header: 'Login', key: 'login', width: 10 },
            { header: 'Matin', key: 'matin', width: 32 },
            { header: 'Après-midi', key: 'apm', width: 10, },
            { header: 'Retard', key: 'retard', width:10}
          ];
          // Add some test data
          await 
      
          // Test styling
      
          // Style first row
          worksheet.getRow(1).font = {
            name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true
          };
          // Style second column
          worksheet.eachRow((row, rowNumber) => {
            row.getCell(2).font = {
              name: 'Arial Black',
              color: { argb: 'FF00FF00' },
              family: 2,
              size: 14,
              bold: true
            };
          });
      
          // Write to file
          workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
            // Do this to use base64 encoding
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
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Android
          dialogTitle: 'Your dialog title here', // Android and Web
          UTI: 'com.microsoft.excel.xlsx' // iOS
        }).catch(error => {
          console.error('Error', error);
        }).then(() => {
          console.log('Return from sharing dialog');
        });
      }
  return (
    <View style={styles.container}>
      <Button title='Generate Excel' onPress={shareExcel} />
    </View>
  );
}
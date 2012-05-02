package org.thorn.core.util;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.model.Workbook;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @ClassName: ExcelUtils
 * @Description:
 * @author chenyun
 * @date 2012-5-2 上午10:28:32
 */
public class ExcelUtils {

	static Logger log = LoggerFactory.getLogger(ExcelUtils.class);

	private static SimpleDateFormat df = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");
	
	public static void setDateFormat(String dateFormat) {
		df = new SimpleDateFormat(dateFormat);
	}
	
	public void write2Excel(ArrayAdapter adapter, String sheetName,
			OutputStream os) throws IOException {
		// office 2003
		HSSFWorkbook workBook = new HSSFWorkbook();

		HSSFSheet sheet = workBook.createSheet(sheetName);

		// creat excel txt header
		HSSFRow header = sheet.createRow(0);
		addColumn2Row(header, adapter.getHeader(), HSSFCell.CELL_TYPE_STRING);
		
		// 冻结标题栏
		sheet.createFreezePane(0, 1);
		
		int excelColumn = adapter.getDataSourceOfSize();
		for (int i = 0; i < excelColumn; i++) {
			// 0 is txt header
			HSSFRow row = sheet.createRow(i + 1);

			addColumn2Row(row, adapter.getRow(i), -1);
		}

		workBook.write(os);
	}

	private void addColumn2Row(HSSFRow row, Object[] content, int cellType) {

		for (int i = 0; i < content.length; i++) {
			HSSFCell cell = row.createCell(i);
			Object obj = content[i];

			if (obj instanceof Boolean) {

				cell.setCellValue((Boolean) obj);
				cell.setCellType(HSSFCell.CELL_TYPE_BOOLEAN);
			} else if (obj instanceof Date) {
				String datetime = df.format((Date) obj);
				cell.setCellValue(new HSSFRichTextString(datetime));
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			} else if (obj instanceof Integer) {

				Integer intObj = (Integer) obj;
				cell.setCellValue(intObj.doubleValue());
				cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			} else if (obj instanceof Double) {

				Double doubleObj = (Double) obj;
				cell.setCellValue(doubleObj);
				cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			} else if (obj instanceof Long) {

				Long longObj = (Long) obj;
				cell.setCellValue(longObj.doubleValue());
				cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			} else if (obj instanceof Float) {

				Float floatObj = (Float) obj;
				cell.setCellValue(floatObj.doubleValue());
				cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			} else {

				cell.setCellValue(new HSSFRichTextString((String) obj));
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			}

			if (cellType > 0) {
				cell.setCellType(cellType);
			}
		}
	}

}

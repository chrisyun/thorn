/**
 * 
 * @param {}
 *            dataUrl
 * @param {}
 *            recordArray:header,id,type,width,sortable,renderer
 * @param {}
 *            gridAttr
 * @param {}
 *            pageSize
 */
function Grid(dataUrl, recordArray, pageSize) {

	this.dataUrl = dataUrl
	this.pageSize = pageSize;

	var storeArray = new Array();

	var columnArray = new Array();
	columnArray.push(new Ext.grid.RowNumberer({}));
	this.sm = new Ext.grid.CheckboxSelectionModel({});
	columnArray.push(this.sm);

	for (var i = 0; i < recordArray.length; i++) {
		var store = new Object();
		store.name = recordArray[i].id;
		store.type = recordArray[i].type;
		store.mapping = recordArray[i].id;
		storeArray.push(store);

		if (Ext.isEmpty(recordArray[i].header)) {
			continue;
		}

		var column = new Object();
		column.header = recordArray[i].header;
		column.id = recordArray[i].id;
		column.dataIndex = recordArray[i].id;
		column.width = recordArray[i].width;
		column.sortable = recordArray[i].sortable;
		column.renderer = recordArray[i].renderer;
		columnArray.push(column);
	}

	this.dataStore = new Ext.data.Store({
				url : dataUrl,
				remoteSort : true,
				reader : new Ext.data.JsonReader({
							totalProperty : "total",
							root : "reslutSet"
						}, Ext.data.Record.create(storeArray))
			});

	this.cm = new Ext.grid.ColumnModel(columnArray);
}

Grid.prototype.setTopBar = function(arrays) {
	this.tbar = arrays;
}

Grid.prototype.setBottomBar = function(arrays) {

	if (Ext.isEmpty(this.pageSize) || this.pageSize <= 0) {
		this.bbar = arrays;
	} else {
		this.bbar = new Ext.PagingToolbar({
					store : this.dataStore,
					pageSize : this.pageSize,
					items : arrays,
					displayInfo : true,
					displayMsg : "当前显示{0}-{1}条,共{2}条",
					emptyMsg : "没有找到相关记录",
					emptyMsg : "没有找到相关记录",
					firstText : "第一页",
					prevText : "上一页",
					nextText : "下一页",
					lastText : "最后页",
					refreshText : "刷新",
					afterPageText : "页,共{0}页",
					beforePageText : "当前第"
				});
	}
}

Grid.prototype.setListeners = function(array) {
	this.listeners = array;
}

Grid.prototype.setGridPanel = function(gridAttr) {

	this.grid = new Ext.grid.GridPanel({
				height : Configuration.bodyHight,
				collapsible : true,
				iconCls : "silk-grid",
				margins : "0 0 0 0",
				loadMask : true,
				split : true,
				store : this.dataStore,
				cm : this.cm,
				sm : this.sm,
				bbar : this.bbar,
				tbar : this.tbar,
				viewConfig : {
					forceFit : true
				},
				listeners : this.listeners
			});

	for (var attr in gridAttr) {
		this.grid[attr] = gridAttr[attr];
	}
}

Grid.prototype.getGridPanel = function() {
	return this.grid;
}

Grid.prototype.getStore = function() {
	return this.dataStore;
}


function getCUDBar(saveHandler, modifyHandler, deleteHandler) {
	var bar = new Array();
	if (saveHandler != null) {
		bar.push("-");
		bar.push({
					text : "增加",
					iconCls : "silk-add",
					minWidth : Configuration.minBtnWidth,
					handler : saveHandler
				});
	}

	if (modifyHandler != null) {
		bar.push("-");
		bar.push({
					text : "修改",
					iconCls : "silk-edit",
					minWidth : Configuration.minBtnWidth,
					handler : modifyHandler
				});
	}

	if (deleteHandler != null) {
		bar.push("-");
		bar.push({
					text : "删除",
					iconCls : "silk-delete",
					minWidth : Configuration.minBtnWidth,
					handler : deleteHandler
				});
	}

	return bar;
}

function getRecord(header, id, type, width, sortable, renderer) {
	var record = new Object();

	if (header != null) {
		record.header = header;
	}
	if (id != null) {
		record.id = id;
	}
	if (type != null) {
		record.type = type;
	}
	if (width != null) {
		record.width = width;
	}
	if (sortable != null) {
		record.sortable = sortable;
	}
	if (renderer != null) {
		record.renderer = renderer;
	}
	
	return record;
}
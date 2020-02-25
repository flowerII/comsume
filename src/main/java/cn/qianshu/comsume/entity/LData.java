package cn.qianshu.comsume.entity;

import java.util.List;

public class LData<T> {

	private int total;
	
	private List<T> list;

	public LData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LData(int total, List<T> list) {
		super();
		this.total = total;
		this.list = list;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}
}

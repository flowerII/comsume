package cn.qianshu.comsume.entity;

public class Class1 {

	private int id;
	private String classcode;
	private String classname;
	
	@Override
	public String toString() {
		return "Class1 [id=" + id + ", classcode=" + classcode + ", classname=" + classname + "]";
	}
	public Class1(int id, String classcode, String classname) {
		super();
		this.id = id;
		this.classcode = classcode;
		this.classname = classname;
	}
	public Class1() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getClasscode() {
		return classcode;
	}
	public void setClasscode(String classcode) {
		this.classcode = classcode;
	}
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
}

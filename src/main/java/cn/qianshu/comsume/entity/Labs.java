package cn.qianshu.comsume.entity;

import java.util.Date;

public class Labs {

	private int id;
	private String labcode;
	private String labname;
	private String location;
	private String labclass;
	private String room;
	private String managername;
	private String managerphone;
	private Date createtime;
	private boolean isUsed;
	
	public Labs(int id, String labcode, String labname, String location, String labclass, String room,
			String managername, String managerphone, Date createtime, boolean isUsed) {
		super();
		this.id = id;
		this.labcode = labcode;
		this.labname = labname;
		this.location = location;
		this.labclass = labclass;
		this.room = room;
		this.managername = managername;
		this.managerphone = managerphone;
		this.createtime = createtime;
		this.isUsed = isUsed;
	}
	public Labs() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Labs [id=" + id + ", labcode=" + labcode + ", labname=" + labname + ", location=" + location
				+ ", labclass=" + labclass + ", room=" + room + ", managername=" + managername + ", managerphone="
				+ managerphone + ", createtime=" + createtime + ", isUsed=" + isUsed + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLabcode() {
		return labcode;
	}
	public void setLabcode(String labcode) {
		this.labcode = labcode;
	}
	public String getLabname() {
		return labname;
	}
	public void setLabname(String labname) {
		this.labname = labname;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLabclass() {
		return labclass;
	}
	public void setLabclass(String labclass) {
		this.labclass = labclass;
	}
	public String getRoom() {
		return room;
	}
	public void setRoom(String room) {
		this.room = room;
	}
	public String getManagername() {
		return managername;
	}
	public void setManagername(String managername) {
		this.managername = managername;
	}
	public String getManagerphone() {
		return managerphone;
	}
	public void setManagerphone(String managerphone) {
		this.managerphone = managerphone;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public boolean isUsed() {
		return isUsed;
	}
	public void setUsed(boolean isUsed) {
		this.isUsed = isUsed;
	}
   
}

package cn.qianshu.comsume.entity;

import java.util.Date;

public class Apply {

	private int id;
	private String applyname;
	private String labcode;
	private String labname;
	private Date applydate;
	private String usereason;
	private Date starttime;
	private Date endtime;
	private Date createtime;
	private Date canceltime;
	private Date confiretime;
	private Date passtime;
	private String passreason;
	private String userinfo;
	private String promise;
	private String status; //1、申请;2、取消；3、审核；4、退回
	
	@Override
	public String toString() {
		return "Apply [id=" + id + ", applyname=" + applyname + ", labcode=" + labcode + ", labname=" + labname
				+ ", applydate=" + applydate + ", usereason=" + usereason + ", starttime=" + starttime + ", endtime="
				+ endtime + ", createtime=" + createtime + ", canceltime=" + canceltime + ", confiretime=" + confiretime
				+ ", passtime=" + passtime + ", passreason=" + passreason + ", userinfo=" + userinfo + ", promise="
				+ promise + ", status=" + status + "]";
	}
	public Apply(int id, String applyname, String labcode, String labname, Date applydate, String usereason,
			Date starttime, Date endtime, Date createtime, Date canceltime, Date confiretime, Date passtime,
			String passreason, String userinfo, String promise, String status) {
		super();
		this.id = id;
		this.applyname = applyname;
		this.labcode = labcode;
		this.labname = labname;
		this.applydate = applydate;
		this.usereason = usereason;
		this.starttime = starttime;
		this.endtime = endtime;
		this.createtime = createtime;
		this.canceltime = canceltime;
		this.confiretime = confiretime;
		this.passtime = passtime;
		this.passreason = passreason;
		this.userinfo = userinfo;
		this.promise = promise;
		this.status = status;
	}
	public Apply() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getApplyname() {
		return applyname;
	}
	public void setApplyname(String applyname) {
		this.applyname = applyname;
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
	public Date getApplydate() {
		return applydate;
	}
	public void setApplydate(Date applydate) {
		this.applydate = applydate;
	}
	public String getUsereason() {
		return usereason;
	}
	public void setUsereason(String usereason) {
		this.usereason = usereason;
	}
	public Date getStarttime() {
		return starttime;
	}
	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}
	public Date getEndtime() {
		return endtime;
	}
	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public Date getCanceltime() {
		return canceltime;
	}
	public void setCanceltime(Date canceltime) {
		this.canceltime = canceltime;
	}
	public Date getConfiretime() {
		return confiretime;
	}
	public void setConfiretime(Date confiretime) {
		this.confiretime = confiretime;
	}
	public Date getPasstime() {
		return passtime;
	}
	public void setPasstime(Date passtime) {
		this.passtime = passtime;
	}
	public String getPassreason() {
		return passreason;
	}
	public void setPassreason(String passreason) {
		this.passreason = passreason;
	}
	public String getUserinfo() {
		return userinfo;
	}
	public void setUserinfo(String userinfo) {
		this.userinfo = userinfo;
	}
	public String getPromise() {
		return promise;
	}
	public void setPromise(String promise) {
		this.promise = promise;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}

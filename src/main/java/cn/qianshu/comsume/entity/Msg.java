package cn.qianshu.comsume.entity;

public class Msg {

	private boolean flag;
	
	private String message;

	@Override
	public String toString() {
		return "Msg [flag=" + flag + ", message=" + message + "]";
	}

	public Msg(boolean flag, String message) {
		super();
		this.flag = flag;
		this.message = message;
	}

	public Msg() {
		super();
		// TODO Auto-generated constructor stub
	}

	public boolean isFlag() {
		return flag;
	}

	public void setFlag(boolean flag) {
		this.flag = flag;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}

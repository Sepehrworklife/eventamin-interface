import jwt_decode from "jwt-decode";
import Router from 'next/router';

export default class Authenticate {
	checkAccess(roles) {
		if (!roles.includes(this.getUserData().role) || !this.getToken()) return Router.push('/login');
	}
	setToken(data) {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("authData", data);
		}
	}
	tokenExpire() {
		if (!this.getToken()) return false;
		const nowDate = Date.now() / 10 ** 3;
		const tokenDate = this.getTokenData().exp;
		if (nowDate > tokenDate) {
			this.removeToken();
			return Router.push('/login?again=true');
		}
	}
	removeToken() {
		if (typeof window !== "undefiend" && this.getToken()) {
			window.localStorage.removeItem("authData");
		}
	}

	getTokenData() {
		if (!this.getToken()) return false;
		const temp = jwt_decode(this.getToken());
		return temp;
	}
	getUserData() {
		if (!this.getToken()) return false;
		const temp = jwt_decode(this.getToken());
		return temp.user;
	}
	getToken() {
		if (typeof window !== "undefiend") {
			if (!window.localStorage.getItem("authData")) return false;
			return window.localStorage.getItem("authData");
		}
	}
}

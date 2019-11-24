import $axios from '$axios';
import store from '@store';

//获取角色列表
export function apiRoleList() {
	return $axios.get(`/member/scene/role/list`);
}

//获取角色信息
export function apiRoleInfo(data) {
	const {secretKey} = data;
	return $axios.post(`/member/scene/role/info`, data).then((res) => {
		const {data} = res;
		//设置角色信息
		store.commit('SET_ROLE_INFO', data);
		//存储秘钥
		window.sessionStorage.setItem('secret-key', secretKey);
	});
}
package org.cy.thorn.security;

import java.util.ArrayList;
import java.util.Collection;

import org.cy.thorn.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;

public class UserSecurity extends User implements UserDetails {
	
	private Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
	
	public UserSecurity(User user) {
		//设置普通用户的角色
		if(user != null) {
			GrantedAuthority auth = new GrantedAuthorityImpl(user.getDefaultrole());
			authorities.add(auth);
			
			this.setUserid(user.getUserid());
			this.setUserpwd(user.getUserpwd());
			this.setUseraccount(user.getUseraccount());
			this.setDefaultrole(user.getDefaultrole());
			
			this.setUname(user.getUname());
			this.setSn(user.getSn());
			this.setSex(user.getSex());
			this.setCumail(user.getCumail());
			this.setPhone(user.getPhone());
			
			this.setOrgid(user.getOrgid());
			this.setOrgname(user.getOrgname());
			this.setCompanyid(user.getCompanyid());
			this.setCompanyname(user.getCompanyname());
			
			this.setIsshow(user.getIsshow());
			this.setIsdisabled(user.getIsdisabled());
			this.setIsvalid(user.getIsvalid());
			
			this.setSortnum(user.getSortnum());
		}
	}
	
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	public void setAuthorities(Collection<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public String getPassword() {
		return super.getUserpwd();
	}
	
	public String getUsername() {
		return super.getUseraccount();
	}
	
	/**
	 * 判断账号是否过期
	 */
	public boolean isAccountNonExpired() {
		if(this.getIsdisabled() != "YES" && this.getIsvalid() != "YES") {
			return true;
		} 
		
		return false;
	}
	
	/**
	 * 判断账号是否锁定
	 */
	public boolean isAccountNonLocked() {
		return isAccountNonExpired();
	}
	
	/**
	 * 判断证书是否过期
	 */
	public boolean isCredentialsNonExpired() {
		return isAccountNonExpired();
	}
	
	/**
	 * 判断账号是否可用
	 */
	public boolean isEnabled() {
		return isAccountNonExpired();
	}
	
}

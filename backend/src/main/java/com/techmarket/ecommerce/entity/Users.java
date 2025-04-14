package com.techmarket.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Users {
	
	
public Users() {
	
}
	
public Users(String email, String name, String password, String role, LocalDateTime  joinDate) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
		this.role= role;
		this.joinDate=joinDate;
	}

public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

@Id
private String email;	

private String name;
private String password;
private String role; 
private LocalDateTime joinDate; 

}


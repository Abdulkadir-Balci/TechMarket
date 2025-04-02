package com.techmarket.ecommerce.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techmarket.ecommerce.entity.Users;
import com.techmarket.ecommerce.repository.UsersRepo;
import com.techmarket.ecommerce.requests.LoginRequest;

@Service
public class UserService {

	@Autowired
	UsersRepo usersRepo;

	public Users addUser(Users user) {

		return usersRepo.save(user);
	}

	public Users LoginUser(LoginRequest loginRequest) {
	    Optional<Users> user = usersRepo.findById(loginRequest.getUserEmail());
	    if (!user.isPresent()) {
	        return null; // Kullanıcı bulunamazsa null dön
	    }
	    Users user1 = user.get();
	    if (!user1.getPassword().equals(loginRequest.getPassword())) {
	        return null; // Şifre yanlışsa null dön
	    }
	    return user1; // Kullanıcı bilgilerini dön
	}
}

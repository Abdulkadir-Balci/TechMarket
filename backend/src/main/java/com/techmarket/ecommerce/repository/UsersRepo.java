package com.techmarket.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techmarket.ecommerce.entity.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, String> {

}
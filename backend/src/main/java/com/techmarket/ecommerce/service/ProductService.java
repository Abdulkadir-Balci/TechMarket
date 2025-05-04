package com.techmarket.ecommerce.service;

import com.techmarket.ecommerce.entity.Product;
import com.techmarket.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    // Çoklu kategori desteklemek için
    private final List<String> categories = Arrays.asList("electronics", "smartphones", "tablets", "laptops", "headphones");

    public void fetchAndSaveProducts() {
        for (String category : categories) {
            fetchAndSaveByCategory(category);
        }
    }

    public void fetchAndSaveByCategory(String category) {
        String url = "https://dummyjson.com/products" + category;

        try {
            Product[] productsArray = restTemplate.getForObject(url, Product[].class);

            if (productsArray != null) {
                List<Product> products = Arrays.asList(productsArray);

                // Her ürüne kategori ekle
                for (Product product : products) {
                    product.setCategory(category);
                }

                productRepository.saveAll(products);
            }
        } catch (Exception e) {
            System.out.println("Kategori verisi çekilemedi: " + category + " - Hata: " + e.getMessage());
        }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}

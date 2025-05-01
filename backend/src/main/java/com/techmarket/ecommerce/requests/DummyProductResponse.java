package com.techmarket.ecommerce.requests;

import com.techmarket.ecommerce.entity.Product;
import java.util.List;

public class DummyProductResponse {
    private List<Product> products;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}

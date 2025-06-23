#pragma once
#include "BaseModel.h"
#include <vector>
#include <string>
#include <algorithm>

struct Product
{
    int id;
    std::string name;
    double price;
};

class ProductModel : public BaseModel
{
private:
    static std::vector<Product> products;
    static int nextId;

public:
    ProductModel() {}

    std::vector<Product> all()
    {
        return products;
    }

    bool create(const std::string &name, double price)
    {
        products.push_back({nextId++, name, price});
        return true;
    }
};
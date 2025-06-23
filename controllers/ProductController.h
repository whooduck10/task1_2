#pragma once
#include "BaseController.h"
#include "models/ProductModel.h"

class ProductController : public BaseController
{
private:
    ProductModel model;

public:
    Response handle(const Request &req) override;

    Response store(const Request &req);
    Response list(const Request &req);
};

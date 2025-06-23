#include "ProductController.h"
#include <sstream>

Response ProductController::handle(const Request &req)
{
    if (req.getMethod() == "GET")
    {
        return list(req);
    }
    else if (req.getMethod() == "POST")
    {
        return store(req);
    }
    else
    {
        Response res;
        res.setStatus(405, "Method Not Allowed");
        return res;
    }
}

Response ProductController::list(const Request &req)
{
    Response res;
    auto products = model.all();

    std::ostringstream body;
    body << "{ \"products\": [";

    for (size_t i = 0; i < products.size(); ++i)
    {
        const auto &p = products[i];
        body << "{"
             << "\"id\": " << p.id << ", "
             << "\"name\": \"" << p.name << "\", "
             << "\"price\": " << p.price
             << "}";

        if (i < products.size() - 1)
        {
            body << ", ";
        }
    }

    body << "] }";

    res.setStatus(200, "OK");
    res.setHeader("Content-Type", "application/json");
    res.setBody(body.str());
    return res;
}

Response ProductController::store(const Request &req)
{
    auto body = req.getBodyJSON();
    Response res;

    if (body.find("name") == body.end() || body.find("price") == body.end())
    {
        res.setStatus(400, "Bad Request");
        res.setBody("Missing 'name' or 'price' in request body");
        return res;
    }

    try
    {
        std::string name = body["name"];
        double price = std::stod(body["price"]);

        model.create(name, price);

        res.setStatus(201, "Created");
        res.setHeader("Content-Type", "text/plain");
        res.setBody("Product created successfully.");
    }
    catch (...)
    {
        res.setStatus(400, "Bad Request");
        res.setHeader("Content-Type", "text/plain");
        res.setBody("Invalid 'price' value");
    }

    return res;
}

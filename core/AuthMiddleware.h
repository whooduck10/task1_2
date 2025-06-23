#pragma once
#include "SessionManager.h"
#include "http/Request.h"
#include "http/Response.h"

class AuthMiddleware
{
public:
    static bool handle(const Request &req, Response &res)
    {
        std::string token;

        // Check Authorization header first
        std::string authHeader = req.getHeader("Authorization");
        if (!authHeader.empty() && authHeader.find("Bearer ") == 0)
        {
            token = parseTokenFromAuthorization(authHeader);
        }
        else
        {
            // Fallback to Cookie header
            std::string cookie = req.getHeader("Cookie");
            token = parseTokenFromCookie(cookie);
        }

        if (SessionManager::isValid(token))
        {
            return true;
        }

        res.setStatus(401, "Unauthorized");
        res.setBody("Invalid or missing session.");
        return false;
    }

private:
    static std::string parseTokenFromAuthorization(const std::string &authHeader)
    {
        const std::string prefix = "Bearer ";
        return authHeader.substr(prefix.length());
    }

    static std::string parseTokenFromCookie(const std::string &cookie)
    {
        const std::string prefix = "token=";
        size_t pos = cookie.find(prefix);
        if (pos == std::string::npos)
            return "";

        size_t start = pos + prefix.length();
        size_t end = cookie.find(';', start);
        if (end == std::string::npos)
            end = cookie.length();

        return cookie.substr(start, end - start);
    }
};

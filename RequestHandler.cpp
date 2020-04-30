#include <stdexcept>
#include <Poco/Exception.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include "RequestHandler.h"

void RequestHandler::handleRequest(Poco::Net::HTTPServerRequest  &request,
								   Poco::Net::HTTPServerResponse &response)
{
	try
	{
		response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);
		response.setContentType("application/json");
		response.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With");
		response.set("Access-Control-Allow-Origin", request.get("Origin", "*"));

		if (request.getContentLength() == -1) // CORS Preflight
			response.send();
		else
		{
			std::string body;
			std::string line;
			while (std::getline(request.stream(), line))
				body += line;
			FromJsonString(body);

			response.send() << ProcessRequest();
		}
	}
	catch (Poco::Exception &e)
	{
		Poco::Util::Application::instance().logger().error(e.displayText());
		response.setStatus(Poco::Net::HTTPResponse::HTTP_BAD_REQUEST);
		response.send() << "{}";
	}
	catch (std::exception &e)
	{
		response.send() << "{}";
	}
}

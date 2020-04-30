#ifndef REQUESTHANDLER_H
#define REQUESTHANDLER_H

#include <string>
#include <boost/noncopyable.hpp>
#include <Poco/Net/HTTPRequestHandler.h>
#include "Common/JsonObject.h"

class RequestHandler :
	public Poco::Net::HTTPRequestHandler,
	private JsonObject,
	private boost::noncopyable
{
public:
	void handleRequest(Poco::Net::HTTPServerRequest  &request,
					   Poco::Net::HTTPServerResponse &response) override final;

protected:
	RequestHandler() = default;
	virtual ~RequestHandler() = default;

private:
	virtual std::string ProcessRequest() = 0;
};

#endif // REQUESTHANDLER_H

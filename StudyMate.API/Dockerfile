FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /study-mate-api

ENV DOTNET_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Docker

COPY . .

COPY appsettings.Docker.json appsettings.json

RUN dotnet restore
RUN dotnet publish -c Release -o release

EXPOSE 5000

ENTRYPOINT ["dotnet", "/study-mate-api/release/StudyMate.API.dll"]
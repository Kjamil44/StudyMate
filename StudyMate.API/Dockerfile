FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /study-mate-api

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o release

EXPOSE 5000

ENTRYPOINT ["dotnet", "/study-mate-api/release/StudyMate.API.dll"]
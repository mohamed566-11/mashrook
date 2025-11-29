# build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy only csproj first (for caching)
COPY Masroo3k.Api/*.csproj ./Masroo3k.Api/
RUN dotnet restore Masroo3k.Api/Masroo3k.Api.csproj

# copy everything else
COPY . .

WORKDIR /src/Masroo3k.Api
RUN dotnet publish -c Release -o /app/publish /p:PublishTrimmed=false

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# copy published output from build stage
COPY --from=build /app/publish .

# copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

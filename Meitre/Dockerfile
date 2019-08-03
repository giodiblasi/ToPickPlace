FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.sln /app/
COPY ./Api/*.csproj /app/Api/
COPY ./Domain/*.csproj /app/Domain/
COPY ./Infrastructure/*.csproj /app/Infrastructure/
COPY ./GeneticAlgorithm/*.csproj /app/GeneticAlgorithm/
COPY ./Tests/*.csproj /app/Tests/
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "api.dll"]
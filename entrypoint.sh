#!/usr/bin/env bash
set -e

# If PORT is set by the platform (Render), use it; otherwise default to 80
: "${PORT:=80}"

# Listen on all interfaces on that port
export ASPNETCORE_URLS="http://0.0.0.0:${PORT}"

exec dotnet Masroo3k.Api.dll

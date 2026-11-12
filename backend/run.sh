#!/usr/bin/env bash
# ==============================================================================
# ThatJoint Co-Living Backend Service Runner
# Grounded in 3-Year KYC & Billing Dataset (coliving_3year_full_kyc_billing.sql)
# Zero-dependency, pure Python 3 standard library
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

PORT="${PORT:-8000}"
HOST="${HOST:-0.0.0.0}"
DB_PATH="$DIR/data/coliving.sqlite"

echo "============================================================"
echo "  🏢 ThatJoint AI Co-Living Backend Engine (Pune Corridor)   "
echo "============================================================"

# Handle --test flag
if [ "$1" = "--test" ] || [ "$1" = "test" ]; then
    echo "🧪 Running backend test suite..."
    python3 "$DIR/test_backend.py"
    exit 0
fi

# Handle --ingest flag
if [ "$1" = "--ingest" ] || [ "$1" = "ingest" ] || [ ! -f "$DB_PATH" ]; then
    echo "📦 Initializing and ingesting dataset into SQLite..."
    python3 "$DIR/ingest.py"
fi

# Parse optional arguments like --port
while [[ $# -gt 0 ]]; do
    case "$1" in
        --port|-p)
            PORT="$2"
            shift 2
            ;;
        --host|-h)
            HOST="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

echo "🚀 Starting ThatJoint HTTP REST API & Chat Engine..."
echo "📍 Host: $HOST"
echo "🔌 Port: $PORT"
echo "🗄️ Database: $DB_PATH"
echo "📡 Chat API: http://${HOST}:${PORT}/api/chat"
echo "🩺 Health Check: http://${HOST}:${PORT}/api/health"
echo "============================================================"

exec python3 "$DIR/server.py" --host "$HOST" --port "$PORT"

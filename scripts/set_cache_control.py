"""
Set Cache-Control headers on all WebP blobs in the gallery container.
Uses Azure Storage Python SDK for reliable handling of Unicode blob names.
"""

import sys
from azure.storage.blob import BlobServiceClient, ContentSettings

ACCOUNT_NAME = "mandlergallery"
CONTAINER_NAME = "gallery"
CACHE_CONTROL = "public, max-age=31536000, immutable"

sys.stdout.reconfigure(encoding='utf-8')


def main():
    # Get account key from az CLI
    import subprocess, shutil
    az_path = shutil.which("az") or r"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd"
    result = subprocess.run(
        [az_path, "storage", "account", "keys", "list",
         "--account-name", ACCOUNT_NAME,
         "--query", "[0].value", "-o", "tsv"],
        capture_output=True, text=True, shell=True
    )
    account_key = result.stdout.strip()
    if not account_key:
        print("ERROR: Could not get account key. Make sure you're logged in with az.")
        sys.exit(1)

    conn_str = (
        f"DefaultEndpointsProtocol=https;"
        f"AccountName={ACCOUNT_NAME};"
        f"AccountKey={account_key};"
        f"EndpointSuffix=core.windows.net"
    )

    service = BlobServiceClient.from_connection_string(conn_str)
    container = service.get_container_client(CONTAINER_NAME)

    # List all webp blobs
    webp_blobs = [b for b in container.list_blobs() if b.name.endswith('.webp')]
    print(f"Found {len(webp_blobs)} WebP blobs to update")

    updated = 0
    already_set = 0
    for i, blob in enumerate(webp_blobs, 1):
        blob_client = container.get_blob_client(blob.name)
        props = blob_client.get_blob_properties()
        cs = props.content_settings
        if cs.cache_control == CACHE_CONTROL:
            already_set += 1
            continue

        blob_client.set_http_headers(ContentSettings(
            content_type=cs.content_type or "image/webp",
            cache_control=CACHE_CONTROL,
            content_encoding=cs.content_encoding,
            content_language=cs.content_language,
            content_disposition=cs.content_disposition,
        ))
        updated += 1
        print(f"[{i}/{len(webp_blobs)}] Set cache: {blob.name}")

    print(f"\nDone! Updated: {updated}, Already set: {already_set}")


if __name__ == "__main__":
    main()

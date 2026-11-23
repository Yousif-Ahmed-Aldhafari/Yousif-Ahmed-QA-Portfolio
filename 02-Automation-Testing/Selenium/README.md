# Selenium WebDriver

Install Python 3.12 and Chrome or Chromium. Start [OrderDesk](../../07-Sample-Projects/orderdesk/README.md) in a separate terminal, then run these commands from this directory on Linux or macOS:

```sh
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m unittest -v
```

Selenium Manager resolves the driver when possible. For an externally provisioned matching driver, set `CHROMEDRIVER_PATH` and optionally `CHROMIUM_PATH`. The page object uses explicit waits for an authenticated user ordering the maximum quantity.

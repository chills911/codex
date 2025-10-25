# Installing PyPDF2 in the Codex sandbox

The development sandbox used for this repository blocks outbound network requests. Because `pip` retrieves
packages from the Python Package Index over the network, attempting to run:

```bash
pip install PyPDF2
```

results in proxy connection failures and the package is not installed. A sample log from the sandbox looks like:

```
WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError('Tunnel connection failed: 403 Forbidden'))': /simple/pypdf2/
...
ERROR: Could not find a version that satisfies the requirement PyPDF2 (from versions: none)
ERROR: No matching distribution found for PyPDF2
```

To use `PyPDF2` inside this environment, download the wheel or source tarball ahead of time and copy it into the sandbox, then install from the local file:

```bash
pip install /path/to/PyPDF2-*.whl
```

Alternatively, vendor the dependency into the repository (for example by adding it to a requirements file and committing the wheel) so it can be installed without live network access.

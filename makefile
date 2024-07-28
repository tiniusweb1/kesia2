# Define the shell to use
SHELL := /bin/bash

# Define the run target
run:
	./run_and_log.sh

# Define the test target
test:
	@echo "Running tests..."
	@if ./run_and_log.sh; then \
		echo "Tests completed successfully!"; \
	else \
		echo "Tests failed. Please check the log for details."; \
	fi

"""Split a CSV file into multiple files based on a selected column.

Usage example:
    python split_csv.py data.csv Category --output-dir output

The script writes one CSV per unique value found in the specified column,
keeping the original header in each output file. Filenames are derived from the
input filename, the column name, and the column value (sanitized to remove
characters that do not work well in filenames).
"""
from __future__ import annotations

import argparse
import csv
import os
from pathlib import Path
from typing import Dict, Iterable, List


def parse_args(argv: Iterable[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Split a CSV on column values")
    parser.add_argument(
        "input_csv",
        type=Path,
        help="Path to the source CSV file",
    )
    parser.add_argument(
        "column",
        help=(
            "Column to split on. Provide either the column name (case-sensitive) "
            "or the zero-based column index."
        ),
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=None,
        help=(
            "Directory to store the generated CSV files. Defaults to the input "
            "file's directory."
        ),
    )
    parser.add_argument(
        "--encoding",
        default="utf-8",
        help="Text encoding of the CSV file (default: utf-8)",
    )
    return parser.parse_args(argv)


def sanitize_for_filename(value: str) -> str:
    """Return a filesystem-friendly representation of *value*."""

    sanitized = value.strip().replace(os.sep, "-")
    forbidden = '<>:\"/\\|?*'
    for char in forbidden:
        sanitized = sanitized.replace(char, "-")
    return sanitized or "empty"


def resolve_column_index(header: List[str], column_arg: str) -> int:
    """Translate *column_arg* into a column index."""

    if column_arg.isdigit():
        index = int(column_arg)
        if index < 0 or index >= len(header):
            raise ValueError(
                f"Column index {index} is out of range for header with "
                f"{len(header)} columns"
            )
        return index

    try:
        return header.index(column_arg)
    except ValueError as exc:  # pragma: no cover - defensive branch
        raise ValueError(
            f"Column '{column_arg}' was not found in the CSV header"
        ) from exc


def split_csv(
    input_csv: Path,
    column_arg: str,
    output_dir: Path | None,
    encoding: str = "utf-8",
) -> List[Path]:
    """Split *input_csv* based on the column specified by *column_arg*."""

    if not input_csv.exists():
        raise FileNotFoundError(f"CSV file not found: {input_csv}")

    destination = output_dir or input_csv.parent
    destination.mkdir(parents=True, exist_ok=True)

    with input_csv.open("r", newline="", encoding=encoding) as handle:
        reader = csv.reader(handle)
        try:
            header = next(reader)
        except StopIteration as exc:
            raise ValueError("The CSV file is empty") from exc

        column_index = resolve_column_index(header, column_arg)
        column_name = header[column_index]

        writers: Dict[str, csv.writer] = {}
        files: Dict[str, Path] = {}
        opened_handles: Dict[str, object] = {}

        try:
            for row_number, row in enumerate(reader, start=2):
                if len(row) != len(header):
                    raise ValueError(
                        "Row %d has %d columns, expected %d"
                        % (row_number, len(row), len(header))
                    )

                key = row[column_index]
                key_label = sanitize_for_filename(key)

                if key_label not in writers:
                    filename = (
                        f"{input_csv.stem}_{sanitize_for_filename(column_name)}"
                        f"-{key_label}.csv"
                    )
                    file_path = destination / filename
                    handle_out = file_path.open("w", newline="", encoding=encoding)
                    writer = csv.writer(handle_out)
                    writer.writerow(header)

                    writers[key_label] = writer
                    files[key_label] = file_path
                    opened_handles[key_label] = handle_out

                writers[key_label].writerow(row)
        finally:
            for handle_out in opened_handles.values():
                handle_out.close()

    return list(files.values())


def main(argv: Iterable[str] | None = None) -> None:
    args = parse_args(argv)
    files = split_csv(args.input_csv, args.column, args.output_dir, args.encoding)
    print("Created %d files:" % len(files))
    for file in files:
        print(f" - {file}")


if __name__ == "__main__":
    main()

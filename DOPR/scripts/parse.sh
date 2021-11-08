#!/bin/bash
python3 parser.py <&0 | python3 summer.py >&1

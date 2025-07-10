#!/bin/bash

echo "============================================="
echo "Adding GitHub Authentication Fields to Database"
echo "============================================="

echo "Running GitHub Authentication Fields Migration..."
npx sequelize-cli db:migrate --name 20250710000001-add-github-auth-fields.js

if [ $? -ne 0 ]; then
  echo "Error running migration!"
  exit 1
fi

echo
echo "============================================="
echo "GitHub Authentication Fields Added Successfully!"
echo "============================================="
echo

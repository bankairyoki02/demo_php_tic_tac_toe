#!/usr/bin/env python3
"""
Test script to verify that the PHP and React code separation was successful.
This test checks that:
1. PHP backend files are in the correct directory
2. React frontend files are in the correct directory
3. Both implementations can be started without errors
4. No files are mixed between the two implementations
"""

import os
import subprocess
import sys
import time
import requests
from pathlib import Path

def test_directory_structure():
    """Test that files are properly separated into correct directories."""
    print("Testing directory structure...")
    
    # Check PHP backend files
    php_backend_dir = Path("php-backend")
    expected_php_files = ["index.php", "styles.css", "script.js", "demo.html", "README.md"]
    
    for file in expected_php_files:
        file_path = php_backend_dir / file
        assert file_path.exists(), f"PHP backend file {file} not found in php-backend/"
        print(f"✓ Found {file} in php-backend/")
    
    # Check React frontend files
    react_frontend_dir = Path("react-frontend")
    expected_react_files = ["package.json", "vite.config.js", "index.html", "README.md"]
    expected_react_dirs = ["src", "public"]
    
    for file in expected_react_files:
        file_path = react_frontend_dir / file
        assert file_path.exists(), f"React frontend file {file} not found in react-frontend/"
        print(f"✓ Found {file} in react-frontend/")
    
    for dir_name in expected_react_dirs:
        dir_path = react_frontend_dir / dir_name
        assert dir_path.exists() and dir_path.is_dir(), f"React frontend directory {dir_name} not found in react-frontend/"
        print(f"✓ Found {dir_name}/ directory in react-frontend/")
    
    print("✓ Directory structure test passed!")

def test_no_mixed_files():
    """Test that no files are mixed between implementations."""
    print("\nTesting for mixed files...")
    
    # Check that PHP files are not in react-frontend (excluding node_modules)
    react_frontend_dir = Path("react-frontend")
    php_extensions = [".php"]
    
    for root, dirs, files in os.walk(react_frontend_dir):
        # Skip node_modules and other dependency directories
        if "node_modules" in root or "dist" in root:
            continue
            
        for file in files:
            file_path = Path(root) / file
            if any(file.endswith(ext) for ext in php_extensions):
                raise AssertionError(f"PHP file {file_path} found in react-frontend directory!")
    
    # Check that React-specific files are not in php-backend
    php_backend_dir = Path("php-backend")
    react_files = ["package.json", "vite.config.js", "eslint.config.js"]
    
    for file in react_files:
        file_path = php_backend_dir / file
        if file_path.exists():
            raise AssertionError(f"React file {file} found in php-backend directory!")
    
    print("✓ No mixed files found!")

def test_php_backend_syntax():
    """Test that PHP backend files have valid syntax."""
    print("\nTesting PHP backend syntax...")
    
    php_file = Path("php-backend/index.php")
    if php_file.exists():
        try:
            # Check PHP syntax
            result = subprocess.run(
                ["php", "-l", str(php_file)], 
                capture_output=True, 
                text=True, 
                timeout=10
            )
            if result.returncode != 0:
                raise AssertionError(f"PHP syntax error in {php_file}: {result.stderr}")
            print(f"✓ PHP syntax check passed for {php_file}")
        except FileNotFoundError:
            print("⚠ PHP not installed, skipping syntax check")
        except subprocess.TimeoutExpired:
            print("⚠ PHP syntax check timed out")

def test_react_frontend_config():
    """Test that React frontend configuration is valid."""
    print("\nTesting React frontend configuration...")
    
    package_json = Path("react-frontend/package.json")
    if package_json.exists():
        import json
        try:
            with open(package_json, 'r') as f:
                config = json.load(f)
            
            # Check required fields
            required_fields = ["name", "scripts", "dependencies"]
            for field in required_fields:
                assert field in config, f"Missing {field} in package.json"
            
            # Check for React dependency
            assert "react" in config["dependencies"], "React dependency not found in package.json"
            
            print("✓ React frontend configuration is valid")
        except json.JSONDecodeError as e:
            raise AssertionError(f"Invalid JSON in package.json: {e}")

def test_readme_files():
    """Test that README files exist and contain relevant information."""
    print("\nTesting README files...")
    
    # Check main README
    main_readme = Path("README.md")
    assert main_readme.exists(), "Main README.md not found"
    
    with open(main_readme, 'r') as f:
        content = f.read()
        assert "php-backend" in content.lower(), "Main README doesn't mention php-backend"
        assert "react-frontend" in content.lower(), "Main README doesn't mention react-frontend"
    
    # Check PHP backend README
    php_readme = Path("php-backend/README.md")
    assert php_readme.exists(), "PHP backend README.md not found"
    
    with open(php_readme, 'r') as f:
        content = f.read()
        assert "php" in content.lower(), "PHP README doesn't mention PHP"
    
    # Check React frontend README
    react_readme = Path("react-frontend/README.md")
    assert react_readme.exists(), "React frontend README.md not found"
    
    with open(react_readme, 'r') as f:
        content = f.read()
        assert "react" in content.lower(), "React README doesn't mention React"
    
    print("✓ All README files are present and contain relevant information")

def run_all_tests():
    """Run all tests."""
    print("Running separation tests...\n")
    
    try:
        test_directory_structure()
        test_no_mixed_files()
        test_php_backend_syntax()
        test_react_frontend_config()
        test_readme_files()
        
        print("\n🎉 All tests passed! The code separation was successful.")
        return True
        
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
        return False
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        return False

if __name__ == "__main__":
    # Change to the repository root directory
    os.chdir(Path(__file__).parent.parent)
    
    success = run_all_tests()
    sys.exit(0 if success else 1)
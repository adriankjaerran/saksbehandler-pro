import fitz  # PyMuPDF
import re
from typing import List, Dict, Union
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def clean_pdf_text(text: str) -> str:
    """
    Clean extracted PDF text by:
    1. Removing excessive whitespace and newlines
    2. Fixing common PDF extraction artifacts
    3. Preserving paragraph breaks
    
    Args:
        text (str): Raw text extracted from PDF
        
    Returns:
        str: Cleaned text
    """
    if not text:
        return ""
        
    # Replace various types of whitespace with a single space
    text = re.sub(r'\s+', ' ', text)
    
    # Fix common PDF extraction artifacts
    text = re.sub(r'(?<=[a-z])- (?=[a-z])', '', text)  # Fix hyphenated words
    
    # Add proper paragraph breaks
    text = re.sub(r'(?<=[.!?])\s+(?=[A-Z])', '\n\n', text)
    
    # Clean up any remaining multiple newlines
    text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
    
    return text.strip()

def read_pdf_text(pdf_path: str) -> str:
    """
    Read a PDF file and extract all text content with proper formatting.
    Uses PyMuPDF for better text extraction.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        str: Extracted and cleaned text from all pages
    """
    try:
        # Open the PDF
        doc = fitz.open(pdf_path)
        
        # Extract text from all pages
        text = ""
        for page in doc:
            # Get text blocks which preserves better formatting
            blocks = page.get_text("blocks")
            # Sort blocks by vertical position then horizontal
            blocks.sort(key=lambda b: (b[1], b[0]))
            # Extract text from each block
            page_text = "\n".join(block[4] for block in blocks)
            text += page_text + "\n\n"
        
        # Close the document
        doc.close()
        
        # Clean and format the extracted text
        cleaned_text = clean_pdf_text(text)
        return cleaned_text
            
    except Exception as e:
        logger.error(f"Error reading PDF {pdf_path}: {str(e)}")
        return ""

def read_pdf_by_pages(pdf_path: str) -> List[str]:
    """
    Read a PDF file and extract text content page by page.
    Uses PyMuPDF for better text extraction.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        List[str]: List of extracted text from each page
    """
    try:
        # Open the PDF
        doc = fitz.open(pdf_path)
        
        # Extract text from each page
        pages = []
        for page in doc:
            # Get text blocks which preserves better formatting
            blocks = page.get_text("blocks")
            # Sort blocks by vertical position then horizontal
            blocks.sort(key=lambda b: (b[1], b[0]))
            # Extract text from each block
            page_text = "\n".join(block[4] for block in blocks)
            pages.append(clean_pdf_text(page_text))
        
        # Close the document
        doc.close()
        
        return pages
            
    except Exception as e:
        logger.error(f"Error reading PDF {pdf_path}: {str(e)}")
        return []

def get_pdf_metadata(pdf_path: str) -> Dict[str, str]:
    """
    Extract metadata from a PDF file using PyMuPDF.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        Dict[str, str]: Dictionary containing PDF metadata
    """
    try:
        # Open the PDF
        doc = fitz.open(pdf_path)
        
        # Get metadata
        metadata = {
            'title': doc.metadata.get('title', ''),
            'author': doc.metadata.get('author', ''),
            'subject': doc.metadata.get('subject', ''),
            'creator': doc.metadata.get('creator', ''),
            'producer': doc.metadata.get('producer', ''),
            'creation_date': doc.metadata.get('creationDate', ''),
            'modification_date': doc.metadata.get('modDate', ''),
            'number_of_pages': doc.page_count
        }
        
        # Close the document
        doc.close()
        
        return metadata
            
    except Exception as e:
        logger.error(f"Error reading PDF metadata {pdf_path}: {str(e)}")
        return {}



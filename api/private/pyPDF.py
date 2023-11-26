#!/bin/usr/env python
# Usage: python pdf_even_page.py

import PDFDocument

filename = "Informe(1)"
doc = PDFDocument(filename)

# Pagina en blanco creada
x = doc.PageCreate()

page_num = 12
for i in range(1, page_num):
    doc = PDFDocument(filename + "_split_page_" + str(i) + ".pdf")
    new_doc.InsertPages(i, doc, 1, doc.GetPageCount(), PDFDocument.e_none)
    doc.Close()
new_doc.Save(output_filename + "_merge_pages.pdf", SDFDoc.e_linearized)
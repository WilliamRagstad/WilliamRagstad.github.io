.PHONY: all clean

all: $(patsubst %.typ, %.svg, $(wildcard *.typ))

clean:
	del *.svg

# Generate all SVG diagrams from Typst source files (match *.typ)
%.svg: %.typ
	typst.exe c .\main.typ "{p}.svg"

/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    function parsesCorrectly(content: string, expected: string) {
        let type = ts.parseJSDocTypeExpression(content, 0);
        let result = Utils.sourceFileToJSON(type);
        assert.equal(result, expected);
    }

    function parsesIncorrectly(content: string) {
        let type = ts.parseJSDocTypeExpression(content, 0);
        assert.equal(type, undefined);
    }

    describe("JSDocParsing", () => {
        describe("parseCorrectly", () => {
            it("unknownType", () => {
                parsesCorrectly("{?}",
                    `{
    "kind": "JSDocUnknownType",
    "pos": 1,
    "end": 2
}`);
            });

            it("allType", () => {
                parsesCorrectly("{*}",
                    `{
    "kind": "JSDocAllType",
    "pos": 1,
    "end": 2
}`);
            });

            it("nullableType", () => {
                parsesCorrectly("{?number}",
                    `{
    "kind": "JSDocNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 2,
        "end": 8,
        "name": {
            "kind": "Identifier",
            "pos": 2,
            "end": 8,
            "text": "number"
        }
    }
}`)
            });

            it("nonNullableType", () => {
                parsesCorrectly("{!number}",
                    `{
    "kind": "JSDocNonNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 2,
        "end": 8,
        "name": {
            "kind": "Identifier",
            "pos": 2,
            "end": 8,
            "text": "number"
        }
    }
}`)
            });

            it("recordType1", () => {
                parsesCorrectly("{{}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 3,
    "member": {
        "length": 0,
        "pos": 2,
        "end": 2
    }
}`)
            });

            it("recordType2", () => {
                parsesCorrectly("{{foo}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 6,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            }
        },
        "length": 1,
        "pos": 2,
        "end": 5
    }
}`)
            });

            it("recordType3", () => {
                parsesCorrectly("{{foo: number}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 14,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 6,
                "end": 13,
                "name": {
                    "kind": "Identifier",
                    "pos": 6,
                    "end": 13,
                    "text": "number"
                }
            }
        },
        "length": 1,
        "pos": 2,
        "end": 13
    }
}`)
            });

            it("recordType4", () => {
                parsesCorrectly("{{foo, bar}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 11,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            }
        },
        "1": {
            "kind": "JSDocMember",
            "pos": 6,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 6,
                "end": 10,
                "text": "bar"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 10
    }
}`)
            });

            it("recordType5", () => {
                parsesCorrectly("{{foo: number, bar}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 19,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 6,
                "end": 13,
                "name": {
                    "kind": "Identifier",
                    "pos": 6,
                    "end": 13,
                    "text": "number"
                }
            }
        },
        "1": {
            "kind": "JSDocMember",
            "pos": 14,
            "end": 18,
            "name": {
                "kind": "Identifier",
                "pos": 14,
                "end": 18,
                "text": "bar"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 18
    }
}`)
            });

            it("recordType6", () => {
                parsesCorrectly("{{foo, bar: number}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 19,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            }
        },
        "1": {
            "kind": "JSDocMember",
            "pos": 6,
            "end": 18,
            "name": {
                "kind": "Identifier",
                "pos": 6,
                "end": 10,
                "text": "bar"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 11,
                "end": 18,
                "name": {
                    "kind": "Identifier",
                    "pos": 11,
                    "end": 18,
                    "text": "number"
                }
            }
        },
        "length": 2,
        "pos": 2,
        "end": 18
    }
}`)
            });

            it("recordType7", () => {
                parsesCorrectly("{{foo: number, bar: number}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 27,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 6,
                "end": 13,
                "name": {
                    "kind": "Identifier",
                    "pos": 6,
                    "end": 13,
                    "text": "number"
                }
            }
        },
        "1": {
            "kind": "JSDocMember",
            "pos": 14,
            "end": 26,
            "name": {
                "kind": "Identifier",
                "pos": 14,
                "end": 18,
                "text": "bar"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 19,
                "end": 26,
                "name": {
                    "kind": "Identifier",
                    "pos": 19,
                    "end": 26,
                    "text": "number"
                }
            }
        },
        "length": 2,
        "pos": 2,
        "end": 26
    }
}`)
            });

            it("recordType8", () => {
                parsesCorrectly("{{function}}",
                    `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 11,
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 10,
            "name": {
                "kind": "FunctionKeyword",
                "pos": 2,
                "end": 10,
                "text": "function"
            }
        },
        "length": 1,
        "pos": 2,
        "end": 10
    }
}`)
            });

            it("unionType", () => {
                parsesCorrectly("{(number|string)}",
`{
    "kind": "JSDocUnionType",
    "pos": 1,
    "end": 16,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 2,
            "end": 8,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 8,
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 9,
            "end": 15,
            "name": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "text": "string"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 15
    }
}`);
            });

            it("functionType1", () => {
                parsesCorrectly("{function()}",
                    `{
    "kind": "JSDocFunctionType",
    "pos": 1,
    "end": 11,
    "parameters": {
        "length": 0,
        "pos": 10,
        "end": 10
    }
}`);
            });

            it("functionType2", () => {
                parsesCorrectly("{function(string, boolean)}",
                    `{
    "kind": "JSDocFunctionType",
    "pos": 1,
    "end": 26,
    "parameters": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 10,
            "end": 16,
            "name": {
                "kind": "Identifier",
                "pos": 10,
                "end": 16,
                "text": "string"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 17,
            "end": 25,
            "name": {
                "kind": "Identifier",
                "pos": 17,
                "end": 25,
                "text": "boolean"
            }
        },
        "length": 2,
        "pos": 10,
        "end": 25
    }
}`);
            });

            it("functionReturnType1", () => {
                parsesCorrectly("{function(string, boolean)}",
                    `{
    "kind": "JSDocFunctionType",
    "pos": 1,
    "end": 26,
    "parameters": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 10,
            "end": 16,
            "name": {
                "kind": "Identifier",
                "pos": 10,
                "end": 16,
                "text": "string"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 17,
            "end": 25,
            "name": {
                "kind": "Identifier",
                "pos": 17,
                "end": 25,
                "text": "boolean"
            }
        },
        "length": 2,
        "pos": 10,
        "end": 25
    }
}`);
            });

            it("thisType1", () => {
                parsesCorrectly("{this:a.b}",
                    `{
    "kind": "JSDocThisType",
    "pos": 1,
    "end": 9,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 6,
        "end": 9,
        "name": {
            "kind": "FirstNode",
            "pos": 6,
            "end": 9,
            "left": {
                "kind": "Identifier",
                "pos": 6,
                "end": 7,
                "text": "a"
            },
            "right": {
                "kind": "Identifier",
                "pos": 8,
                "end": 9,
                "text": "b"
            }
        }
    }
}`);
            });

            it("newType1", () => {
                parsesCorrectly("{new:a.b}",
                    `{
    "kind": "JSDocConstructorType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 5,
        "end": 8,
        "name": {
            "kind": "FirstNode",
            "pos": 5,
            "end": 8,
            "left": {
                "kind": "Identifier",
                "pos": 5,
                "end": 6,
                "text": "a"
            },
            "right": {
                "kind": "Identifier",
                "pos": 7,
                "end": 8,
                "text": "b"
            }
        }
    }
}`);
            });

            it("variadicType", () => {
                parsesCorrectly("{...number}",
                    `{
    "kind": "JSDocVariadicType",
    "pos": 1,
    "end": 10,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 4,
        "end": 10,
        "name": {
            "kind": "Identifier",
            "pos": 4,
            "end": 10,
            "text": "number"
        }
    }
}`);
            });

            it("optionalType", () => {
                parsesCorrectly("{number=}",
                    `{
    "kind": "JSDocOptionalType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 1,
        "end": 7,
        "name": {
            "kind": "Identifier",
            "pos": 1,
            "end": 7,
            "text": "number"
        }
    }
}`);
            });

            it("optionalNullable", () => {
                parsesCorrectly("{?=}",
                    `{
    "kind": "JSDocOptionalType",
    "pos": 1,
    "end": 3,
    "type": {
        "kind": "JSDocUnknownType",
        "pos": 1,
        "end": 2
    }
}`);
            });

            it("typeReference1", () => {
                parsesCorrectly("{a.<number>}",
                    `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 11,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 2,
        "text": "a"
    },
    "typeArguments": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 4,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 4,
                "end": 10,
                "text": "number"
            }
        },
        "length": 1,
        "pos": 4,
        "end": 10
    }
}`);
            });

            it("typeReference2", () => {
                parsesCorrectly("{a.<number,string>}",
                    `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 18,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 2,
        "text": "a"
    },
    "typeArguments": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 4,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 4,
                "end": 10,
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 11,
            "end": 17,
            "name": {
                "kind": "Identifier",
                "pos": 11,
                "end": 17,
                "text": "string"
            }
        },
        "length": 2,
        "pos": 4,
        "end": 17
    }
}`);
            });

            it("typeReference3", () => {
                parsesCorrectly("{a.function}",
                    `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 11,
    "name": {
        "kind": "FirstNode",
        "pos": 1,
        "end": 11,
        "left": {
            "kind": "Identifier",
            "pos": 1,
            "end": 2,
            "text": "a"
        },
        "right": {
            "kind": "Identifier",
            "pos": 3,
            "end": 11,
            "text": "function"
        }
    }
}`);
            });
        });

        describe("parsesIncorrectly", () => {
            it("emptyType", () => {
                parsesIncorrectly("{}");
            });

            it("trailingCommaInRecordType", () => {
                parsesIncorrectly("{{a,}}");
            });

            it("unionTypeWithTrailingBar", () => {
                parsesIncorrectly("{(a|)}");
            });

            it("unionTypeWithoutTypes", () => {
                parsesIncorrectly("{()}");
            });

            it("nullableTypeWithoutType", () => {
                parsesIncorrectly("{!}");
            });

            it("functionTypeWithTrailingComma", () => {
                parsesIncorrectly("{function(a,)}");
            });

            it("keyword", () => {
                parsesIncorrectly("{var}");
            });

            it("thisWithoutType", () => {
                parsesIncorrectly("{this:}");
            });

            it("newWithoutType", () => {
                parsesIncorrectly("{new:}");
            });

            it("variadicWithoutType", () => {
                parsesIncorrectly("{...}");
            });

            it("optionalWithoutType", () => {
                parsesIncorrectly("{=}");
            });

            it("allWithType", () => {
                parsesIncorrectly("{*foo}");
            });

            it("emptyTypeArguments", () => {
                parsesIncorrectly("{a.<>}");
            });

            it("typeArgumentsWithTrailingComma", () => {
                parsesIncorrectly("{a.<a,>}");
            });

            it("arrayType", () => {
                parsesIncorrectly("{a[]}");
            });

            it("tsFunctionType", () => {
                parsesIncorrectly("{() => string}");
            });

            it("tsConstructoType", () => {
                parsesIncorrectly("{new () => string}");
            });

            it("tupleType", () => {
                parsesIncorrectly("{[number,string]}");
            });

            it("typeOfType", () => {
                parsesIncorrectly("{typeof M}");
            });

            it("namedParameter", () => {
                parsesIncorrectly("{function(a: number)}");
            });

            it("callSignatureInRecordType", () => {
                parsesIncorrectly("{{(): number}}");
            });

            it("methodInRecordType", () => {
                parsesIncorrectly("{{foo(): number}}");
            });
        });
    });
}
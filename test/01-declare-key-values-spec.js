const chai = require("chai");
chai.use(require("chai-spies"));
const expect = chai.expect;
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

describe("01-declare-key-values.js", function() {
  let consoleSpy = chai.spy.on(console, 'log');
  let filePath = path.resolve(__dirname, '../problems/01-declare-key-values.js');
  let obj = require(filePath);

  it("prints 'firstValue' first", function () {
    expect(consoleSpy).on.nth(1).be.called.with('firstValue');
    expect(obj["firstKey"]).to.eq('firstValue');
  });
  it("prints '2' second", function () {
    expect(consoleSpy).on.nth(2).be.called.with(2);
    expect(obj["numeric"]).to.eq(2);
  });
  it("prints 'false' third", function () {
    expect(consoleSpy).on.nth(3).be.called.with(false);
    expect(obj["boolean"]).to.eq(false);
  });
  it("prints '{ hello: \"world!\" }' last", function () {
    expect(consoleSpy).on.nth(4).be.called.with({ hello: "world!" });
    expect(obj["object"]).to.eql({ hello: "world!" });
  });
  it('uses both dot and bracket notation', function () {
    let code = fs.readFileSync(filePath, 'utf-8');
    let usesDotNotation = false;
    let usesBracketNotation = false;

    babel.parse(code, { sourceType: 'module' }, (error, ast) => {
      if (error) {
        console.error(`error parsing ${filePath}`);
        console.error(error.message || 'Unknown error');
        return;
      }

      babel.traverse(ast, {
        AssignmentExpression(path) {
          let target = path.node.left;
          if (target.type === 'MemberExpression' &&
              target.object.name === 'obj') {
            if (target.computed) {
              usesBracketNotation = true;
            } else {
              usesDotNotation = true;
            }
          }
        }
      });
    });

    expect(usesDotNotation, 'uses dot notation').to.be.true;
    expect(usesBracketNotation, 'uses bracket notation').to.be.true;
  });

  chai.spy.restore(console);
});

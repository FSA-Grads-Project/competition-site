module.exports = function(babel) {
  let t = babel.types;
  return {
     visitor: {
        WhileStatement: function transformWhile(path) {
           let variableName = path.scope
            .generateUidIdentifier("timer");
           let declaration = t.declareVariable(variableName);
           path.scope.parent.push(declaration);
           let definition = t.assignmentExpression(
              "=",
              variableName,
              t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
           );
           path.insertBefore(t.expressionStatement(definition));
           const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(5000)));
           path
              .get("body")
              .pushContainer(
                 "body",
                 t.ifStatement(
                    t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                    t.throwStatement(t.stringLiteral("Execution Timed out - Check your while loops")),
                    null
                 )
              );
        },
        ForStatement: function transformFor(path) {
          let variableName = path.scope
           .generateUidIdentifier("timer");
          let declaration = t.declareVariable(variableName);
          path.scope.parent.push(declaration);
          let definition = t.assignmentExpression(
             "=",
             variableName,
             t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
          );
          path.insertBefore(t.expressionStatement(definition));
          const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(5000)));
          path
             .get("body")
             .pushContainer(
                "body",
                t.ifStatement(
                   t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                   t.throwStatement(t.stringLiteral("Execution Timed out - Check your for loops")),
                   null
                )
             );
       },
       DoWhileStatement: function transformDoWhile(path) {
        let variableName = path.scope
         .generateUidIdentifier("timer");
        let declaration = t.declareVariable(variableName);
        path.scope.parent.push(declaration);
        let definition = t.assignmentExpression(
           "=",
           variableName,
           t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
        );
        path.insertBefore(t.expressionStatement(definition));
        const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(5000)));
        path
           .get("body")
           .pushContainer(
              "body",
              t.ifStatement(
                 t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                 t.throwStatement(t.stringLiteral("Execution Timed out - Check your do while loops")),
                 null
              )
           );
     },
     }
  };
};
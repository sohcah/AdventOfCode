const lintCode = (context, node) => {
    context.report({
        node,
        message: "You probably don't want to use 'in'",
    });
};

// https://eslint.org/docs/developer-guide/working-with-rules-working with custom rules
module.exports = {
    meta: {
        type: "problem",
        fixable: "code",
        docs: {
            description:
                "You probably don't want to use 'in'",
            category: "Possible Errors",
        },
        schema: [],
    },
    create: (context) => ({
        ForInStatement(node) {
            lintCode(context, node);
        },
    }),
};

System.config({
    baseURL: "./",
    paths: {
        "github:*": "jspm_packages/github/*",
        "npm:*": "jspm_packages/npm/*"
    },
    bundles: {
        "node_modules/dist/awayjs-core.js": ["awayjs-core/lib/utils/getTimer"]
    },
    defaultExtension: "ts",
    meta: {
        "*.ts": {
            loader: "ts"
        }
    },
    packages: {
        "lib": {
            defaultExtension: "ts",
            meta: {
                "*.ts": {
                    loader: "ts"
                }
            },
        },
        "awayjs-core": {
            defaultExtension: false,
        },
        "ts": {
            defaultExtension: "js",
        },
        "typescript": {
            defaultExtension: "js",
        }
    },
    map: {
        "ts": "github:frankwallis/plugin-typescript@4.0.5.js",
        "typescript": "npm:typescript@1.8.9.js",
        "github:frankwallis/plugin-typescript@4.0.5": {
            "typescript": "npm:typescript@1.8.9.js"
        },
        "github:jspm/nodelibs-os@0.1.0": {
            "os-browserify": "npm:os-browserify@0.1.2.js"
        },
        "npm:os-browserify@0.1.2": {
            "os": "github:jspm/nodelibs-os@0.1.0.js"
        },
        "npm:typescript@1.8.9": {
            "os": "github:jspm/nodelibs-os@0.1.0.js"
        }
    }
});

import globals from 'globals'
// 预定义配置
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

// import babelParser from "@typescript-eslint/parser";
import commpnParser from 'vue-eslint-parser'
import prettier from 'eslint-plugin-prettier'

// "@babel/eslint-parser";

// import customConfig from "./esconfig/custom_config.js";

export default [
  // languageOptions：配置如何检查 js 代码
  {
    // 1.1 处理 与 JavaScript 相关的配置项
    // - ecmaVersion
    // - sourceType
    // - globals
    // - parser
    // - parserOptions
    // files: ["**/*.ts", "**/*.vue"],
    // ignores: ["**/*.config.js"],
    ignores: [
      '**/*.config.js',
      'dist/**',
      'node_modules/**',
      '!**/eslint.config.js'
    ],
    languageOptions: {
      // 1.11 定义可用的全局变量
      globals: globals.browser,
      // 1.12 扩展
      // ecmaVersion: "latest",
      // sourceType: "module",
      parser: commpnParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  // 原来的extends替换为如下模式
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true, // 单引号
          semi: false, // 无分号
          printWidth: 80, // 每行宽度至多80字符
          trailingComma: 'none', // 不加对象|数组最后逗号
          endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
        }
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
        }
      ],
      'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
      // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
      'no-undef': 'error'
    }
  }
]

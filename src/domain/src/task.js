class Task {
  constructor(code) {
    this.tc = code[0]
    this.rc = code[1]
    this.dc = code.slice(2)
    this.code = code
  }

  toTableEntity() {
    return {
      partitionKey: this.tc,
      rowKey: this.code
    }
  }
}

module.exports = Task
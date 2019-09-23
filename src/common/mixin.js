const _logger = console;
export const logger = {
  methods: {
    log() {
      _logger.log(Array.from(arguments));
    },
  },
};

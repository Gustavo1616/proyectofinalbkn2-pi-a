import { Command } from 'commander';

const args = new Command();

args.option("--mode <mode>", "mode prod/dev/test", "dev");

args.parse();
export default args.opts();
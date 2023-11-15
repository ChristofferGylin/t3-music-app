export function scaleValue(args: {
  value: number;
  fromScale: { start: number; end: number };
  toScale: { start: number; end: number };
}) {
  const scale =
    (args.toScale.end - args.toScale.start) /
    (args.fromScale.end - args.fromScale.start);
  const capped =
    Math.min(args.fromScale.end, Math.max(args.fromScale.start, args.value)) -
    args.fromScale.start;
  return capped * scale + args.toScale.start;
}

/**
 * Arabic Contextual Shaping Utility
 *
 * WebGL SDF text rendering engines without OpenType GSUB table processing
 * (such as troika-three-text / Typr.js) require input strings to be shaped
 * into Arabic Presentation Forms-B (U+FE70 - U+FEFC) so that initial, medial,
 * final, and ligature glyphs connect properly into cursive Arabic script.
 */

// Forms index: [isolated, final, initial, medial]
interface GlyphForms {
  isolated: number;
  final: number;
  initial?: number;
  medial?: number;
}

const ARABIC_GLYPHS: Record<number, GlyphForms> = {
  0x0621: { isolated: 0xfe80, final: 0xfe80 }, // Hamza (never joins)
  0x0622: { isolated: 0xfe81, final: 0xfe82 }, // Alef with Madda (right-joining)
  0x0623: { isolated: 0xfe83, final: 0xfe84 }, // Alef with Hamza Above (right-joining)
  0x0624: { isolated: 0xfe85, final: 0xfe86 }, // Waw with Hamza Above (right-joining)
  0x0625: { isolated: 0xfe87, final: 0xfe88 }, // Alef with Hamza Below (right-joining)
  0x0626: { isolated: 0xfe89, final: 0xfe8a, initial: 0xfe8b, medial: 0xfe8c }, // Yeh with Hamza Above (dual)
  0x0627: { isolated: 0xfe8d, final: 0xfe8e }, // Alef (right-joining)
  0x0628: { isolated: 0xfe8f, final: 0xfe90, initial: 0xfe91, medial: 0xfe92 }, // Beh (dual)
  0x0629: { isolated: 0xfe93, final: 0xfe94 }, // Teh Marbuta (right-joining)
  0x062a: { isolated: 0xfe95, final: 0xfe96, initial: 0xfe97, medial: 0xfe98 }, // Teh (dual)
  0x062b: { isolated: 0xfe99, final: 0xfe9a, initial: 0xfe9b, medial: 0xfe9c }, // Theh (dual)
  0x062c: { isolated: 0xfe9d, final: 0xfe9e, initial: 0xfe9f, medial: 0xfea0 }, // Jeem (dual)
  0x062d: { isolated: 0xfea1, final: 0xfea2, initial: 0xfea3, medial: 0xfea4 }, // Hah (dual)
  0x062e: { isolated: 0xfea5, final: 0xfea6, initial: 0xfea7, medial: 0xfea8 }, // Khaa (dual)
  0x062f: { isolated: 0xfea9, final: 0xfeaa }, // Dal (right-joining)
  0x0630: { isolated: 0xfeab, final: 0xfeac }, // Thal (right-joining)
  0x0631: { isolated: 0xfead, final: 0xfeae }, // Reh (right-joining)
  0x0632: { isolated: 0xfeaf, final: 0xfeb0 }, // Zain (right-joining)
  0x0633: { isolated: 0xfeb1, final: 0xfeb2, initial: 0xfeb3, medial: 0xfeb4 }, // Seen (dual)
  0x0634: { isolated: 0xfeb5, final: 0xfeb6, initial: 0xfeb7, medial: 0xfeb8 }, // Sheen (dual)
  0x0635: { isolated: 0xfeb9, final: 0xfeba, initial: 0xfebb, medial: 0xfebc }, // Sad (dual)
  0x0636: { isolated: 0xfebd, final: 0xfebe, initial: 0xfebf, medial: 0xfec0 }, // Dad (dual)
  0x0637: { isolated: 0xfec1, final: 0xfec2, initial: 0xfec3, medial: 0xfec4 }, // Tah (dual)
  0x0638: { isolated: 0xfec5, final: 0xfec6, initial: 0xfec7, medial: 0xfec8 }, // Zah (dual)
  0x0639: { isolated: 0xfec9, final: 0xfeca, initial: 0xfecb, medial: 0xfecc }, // Ain (dual)
  0x063a: { isolated: 0xfecd, final: 0xfece, initial: 0xfecf, medial: 0xfed0 }, // Ghain (dual)
  0x0640: { isolated: 0x0640, final: 0x0640, initial: 0x0640, medial: 0x0640 }, // Tatweel
  0x0641: { isolated: 0xfed1, final: 0xfed2, initial: 0xfed3, medial: 0xfed4 }, // Feh (dual)
  0x0642: { isolated: 0xfed5, final: 0xfed6, initial: 0xfed7, medial: 0xfed8 }, // Qaf (dual)
  0x0643: { isolated: 0xfed9, final: 0xfeda, initial: 0xfedb, medial: 0xfedc }, // Kaf (dual)
  0x0644: { isolated: 0xfedd, final: 0xfede, initial: 0xfedf, medial: 0xfee0 }, // Lam (dual)
  0x0645: { isolated: 0xfee1, final: 0xfee2, initial: 0xfee3, medial: 0xfee4 }, // Meem (dual)
  0x0646: { isolated: 0xfee5, final: 0xfee6, initial: 0xfee7, medial: 0xfee8 }, // Noon (dual)
  0x0647: { isolated: 0xfee9, final: 0xfeea, initial: 0xfeeb, medial: 0xfeec }, // Heh (dual)
  0x0648: { isolated: 0xfeed, final: 0xfeee }, // Waw (right-joining)
  0x0649: { isolated: 0xfeef, final: 0xfef0 }, // Alef Maksura (right-joining)
  0x064a: { isolated: 0xfef1, final: 0xfef2, initial: 0xfef3, medial: 0xfef4 }, // Yeh (dual)
};

// Lam-Alef Ligature definitions
const LAM_ALEF_MAP: Record<number, { isolated: number; final: number }> = {
  0x0622: { isolated: 0xfef5, final: 0xfef6 }, // Lam + Alef with Madda
  0x0623: { isolated: 0xfef7, final: 0xfef8 }, // Lam + Alef with Hamza Above
  0x0625: { isolated: 0xfef9, final: 0xfefa }, // Lam + Alef with Hamza Below
  0x0627: { isolated: 0xfefb, final: 0xfefc }, // Lam + Alef
};

function isArabicLetter(cp: number): boolean {
  return cp in ARABIC_GLYPHS;
}

function canConnectToNext(cp: number): boolean {
  const forms = ARABIC_GLYPHS[cp];
  return Boolean(forms && forms.initial !== undefined);
}

function canConnectToPrev(cp: number): boolean {
  const forms = ARABIC_GLYPHS[cp];
  return Boolean(forms && forms.final !== undefined);
}

/**
 * Shapes standard Arabic text into Presentation Forms-B cursive characters.
 * Leaves non-Arabic characters, whitespace, and punctuation untouched.
 */
export function shapeArabic(text: string): string {
  if (!text) return "";

  const codePoints = Array.from(text).map((char) => char.codePointAt(0) || 0);
  const result: string[] = [];

  for (let i = 0; i < codePoints.length; i++) {
    const current = codePoints[i];
    if (current === undefined) continue;

    if (!isArabicLetter(current)) {
      result.push(String.fromCodePoint(current));
      continue;
    }

    // Determine if preceded by a letter that connects to next
    const prev = i > 0 ? (codePoints[i - 1] ?? 0) : 0;
    const connectedToPrev = prev !== 0 && isArabicLetter(prev) && canConnectToNext(prev);

    // Determine if followed by an Arabic letter that can connect to prev
    const next = i + 1 < codePoints.length ? (codePoints[i + 1] ?? 0) : 0;

    // Check for Lam-Alef ligature
    if (current === 0x0644 && next !== 0 && next in LAM_ALEF_MAP) {
      const lig = LAM_ALEF_MAP[next];
      if (lig) {
        const ligCp = connectedToPrev ? lig.final : lig.isolated;
        result.push(String.fromCodePoint(ligCp));
        i++; // Skip the combined Alef
        continue;
      }
    }

    const connectedToNext =
      next !== 0 && isArabicLetter(next) && canConnectToPrev(next) && canConnectToNext(current);

    const forms = ARABIC_GLYPHS[current];
    if (!forms) {
      result.push(String.fromCodePoint(current));
      continue;
    }

    let shapedCp = forms.isolated;

    if (connectedToPrev && connectedToNext) {
      shapedCp = forms.medial ?? forms.final;
    } else if (connectedToPrev) {
      shapedCp = forms.final;
    } else if (connectedToNext) {
      shapedCp = forms.initial ?? forms.isolated;
    }

    result.push(String.fromCodePoint(shapedCp));
  }

  return result.join("");
}

import {
  Fragment,
  Transition,
  TransitionGroup,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  guardReactiveProps,
  h,
  inject,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  onMounted,
  openBlock,
  provide,
  ref,
  renderList,
  renderSlot,
  resolveDirective,
  resolveDynamicComponent,
  toDisplayString,
  toHandlers,
  toRaw,
  toRef,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-OL6HMLMB.js";

// node_modules/@form-blocks/vue/dist/form-blocks.es.js
var le = Object.create;
var E = Object.defineProperty;
var ue = Object.getOwnPropertyDescriptor;
var de = Object.getOwnPropertyNames;
var D = Object.getPrototypeOf;
var fe = Object.prototype.hasOwnProperty;
var O = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var pe = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (var i = de(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !fe.call(e, s) && s !== n && E(e, s, {
    get: ((e2) => t[e2]).bind(null, s),
    enumerable: !(r = ue(t, s)) || r.enumerable
  });
  return e;
};
var me = (e, t, n) => (n = e == null ? {} : le(D(e)), pe(t || !e || !e.__esModule ? E(n, "default", {
  value: e,
  enumerable: true
}) : n, e));
var k = Object.defineProperty;
var he = (e, t, n) => t in e ? k(e, t, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: n
}) : e[t] = n;
var ge = (e, t, n) => he(e, typeof t == "symbol" ? t : t + "", n);
var _e = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
};
var ve = (e, t, n) => e.replaceAll(t, "").replace(n, ".").replace("..", ".").replace(/[^.\d]/g, "");
var ye = (e, t, n) => {
  var _a;
  return new Intl.NumberFormat(((_a = n.number) == null ? void 0 : _a.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
};
var be = (e, t = true, n) => {
  var _a, _b, _c, _d;
  let r = ((_a = n.number) == null ? void 0 : _a.unsigned) !== true && e.startsWith("-") ? "-" : "", i = ((_b = n.number) == null ? void 0 : _b.fraction) ?? 0, a = ye(0, i, n), o = a.formatToParts(1000.12), s = ((_c = o.find((e2) => e2.type === "group")) == null ? void 0 : _c.value) ?? " ", c = ((_d = o.find((e2) => e2.type === "decimal")) == null ? void 0 : _d.value) ?? ".", l = ve(e, s, c);
  if (Number.isNaN(parseFloat(l))) return r;
  let u = l.split(".");
  u[1] != null && u[1].length >= 1 && (a = ye(u[1].length <= i ? u[1].length : i, i, n));
  let d = a.format(parseFloat(l));
  return t ? i > 0 && l.endsWith(".") && !l.slice(0, -1).includes(".") && (d += c) : d = ve(d, s, c), r + d;
};
var xe = (e) => JSON.parse(e.replaceAll("'", '"'));
var Se = (e, t = {}) => {
  let n = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (n.mask = Ce(e.dataset.maska)), e.dataset.maskaEager != null && (n.eager = A(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (n.reversed = A(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (n.tokensReplace = A(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (n.tokens = we(e.dataset.maskaTokens));
  let r = {};
  return e.dataset.maskaNumberLocale != null && (r.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (r.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (r.unsigned = A(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(r).length > 0) && (n.number = r), n;
};
var A = (e) => e === "" ? true : !!JSON.parse(e);
var Ce = (e) => e.startsWith("[") && e.endsWith("]") ? xe(e) : e;
var we = (e) => {
  if (e.startsWith("{") && e.endsWith("}")) return xe(e);
  let t = {};
  return e.split("|").forEach((e2) => {
    let n = e2.split(":");
    t[n[0]] = {
      pattern: Te() ? new RegExp(n[1], "u") : new RegExp(n[1]),
      optional: n[2] === "optional",
      multiple: n[2] === "multiple",
      repeated: n[2] === "repeated"
    };
  }), t;
};
var Te = () => {
  try {
    return true;
  } catch {
    return false;
  }
};
var Ee = class {
  constructor(e = {}) {
    ge(this, "opts", {}), ge(this, "memo", /* @__PURE__ */ new Map());
    let t = { ...e };
    if (t.tokens != null) {
      t.tokens = t.tokensReplace ? { ...t.tokens } : {
        ..._e,
        ...t.tokens
      };
      for (let e2 of Object.values(t.tokens)) typeof e2.pattern == "string" && (e2.pattern = Te() ? new RegExp(e2.pattern, "u") : new RegExp(e2.pattern));
    } else t.tokens = _e;
    Array.isArray(t.mask) && (t.mask.length > 1 ? t.mask = [...t.mask].sort((e2, t2) => e2.length - t2.length) : t.mask = t.mask[0] ?? ""), t.mask === "" && (t.mask = null), this.opts = t;
  }
  masked(e) {
    return this.process(String(e), this.findMask(String(e)));
  }
  unmasked(e) {
    return this.process(String(e), this.findMask(String(e)), false);
  }
  isEager() {
    return this.opts.eager === true;
  }
  isReversed() {
    return this.opts.reversed === true;
  }
  completed(e) {
    let t = this.findMask(String(e));
    if (this.opts.mask == null || t == null) return false;
    let n = this.process(String(e), t).length;
    return typeof this.opts.mask == "string" ? n >= this.opts.mask.length : n >= t.length;
  }
  findMask(e) {
    let t = this.opts.mask;
    if (t == null) return null;
    if (typeof t == "string") return t;
    if (typeof t == "function") return t(e);
    let n = this.process(e, t.slice(-1).pop() ?? "", false);
    return t.find((t2) => this.process(e, t2, false).length >= n.length) ?? "";
  }
  escapeMask(e) {
    let t = [], n = [];
    return e.split("").forEach((r, i) => {
      r === "!" && e[i - 1] !== "!" ? n.push(i - n.length) : t.push(r);
    }), {
      mask: t.join(""),
      escaped: n
    };
  }
  process(e, t, n = true) {
    if (this.opts.number != null) return be(e, n, this.opts);
    if (t == null) return e;
    let r = `v=${e},mr=${t},m=${+!!n}`;
    if (this.memo.has(r)) return this.memo.get(r);
    let { mask: i, escaped: a } = this.escapeMask(t), o = [], s = this.opts.tokens == null ? {} : this.opts.tokens, c = this.isReversed() ? -1 : 1, l = this.isReversed() ? "unshift" : "push", u = this.isReversed() ? 0 : i.length - 1, d = this.isReversed() ? () => h2 > -1 && g > -1 : () => h2 < i.length && g < e.length, f = (e2) => !this.isReversed() && e2 <= u || this.isReversed() && e2 >= u, p, m = -1, h2 = this.isReversed() ? i.length - 1 : 0, g = this.isReversed() ? e.length - 1 : 0, _ = false;
    for (; d(); ) {
      let t2 = i.charAt(h2), r2 = s[t2], d2 = (r2 == null ? void 0 : r2.transform) == null ? e.charAt(g) : r2.transform(e.charAt(g));
      if (!a.includes(h2) && r2 != null ? (d2.match(r2.pattern) == null ? r2.multiple ? _ && (_ = (h2 += c, g -= c, false)) : d2 === p ? p = void 0 : r2.optional && (h2 += c, g -= c) : (o[l](d2), r2.repeated ? (m === -1 ? m = h2 : h2 === u && h2 !== m && (h2 = m - c), u === m && (h2 -= c)) : r2.multiple && (_ = true, h2 -= c), h2 += c), g += c) : (n && !this.isEager() && o[l](t2), d2 === t2 && !this.isEager() ? g += c : p = t2, this.isEager() || (h2 += c)), this.isEager()) for (; f(h2) && (s[i.charAt(h2)] == null || a.includes(h2)); ) {
        if (n) {
          if (o[l](i.charAt(h2)), e.charAt(g) === i.charAt(h2)) {
            h2 += c, g += c;
            continue;
          }
        } else i.charAt(h2) === e.charAt(g) && (g += c);
        h2 += c;
      }
    }
    return this.memo.set(r, o.join("")), this.memo.get(r);
  }
};
var De = class {
  constructor(e, t = {}) {
    ge(this, "items", /* @__PURE__ */ new Map()), ge(this, "eventAbortController"), ge(this, "onInput", (e2) => {
      if (e2 instanceof CustomEvent && e2.type === "input" && !e2.isTrusted && !e2.bubbles) return;
      let t2 = e2.target, n = this.items.get(t2);
      if (n === void 0) return;
      let r = "inputType" in e2 && e2.inputType.startsWith("delete"), i = n.isEager(), a = r && i && n.unmasked(t2.value) === "" ? "" : t2.value;
      this.fixCursor(t2, r, () => this.setValue(t2, a));
    }), this.options = t, this.eventAbortController = new AbortController(), this.init(this.getInputs(e));
  }
  update(e = {}) {
    this.options = { ...e }, this.init(Array.from(this.items.keys()));
  }
  updateValue(e) {
    var _a;
    e.value !== "" && e.value !== ((_a = this.processInput(e)) == null ? void 0 : _a.masked) && this.setValue(e, e.value);
  }
  destroy() {
    this.eventAbortController.abort(), this.items.clear();
  }
  init(e) {
    let t = this.getOptions(this.options);
    for (let n of e) {
      if (!this.items.has(n)) {
        let { signal: e3 } = this.eventAbortController;
        n.addEventListener("input", this.onInput, {
          capture: true,
          signal: e3
        });
      }
      let e2 = new Ee(Se(n, t));
      this.items.set(n, e2), queueMicrotask(() => this.updateValue(n)), n.selectionStart === null && e2.isEager() && console.warn("Maska: input of `%s` type is not supported", n.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    let { onMaska: t, preProcess: n, postProcess: r, ...i } = e;
    return i;
  }
  fixCursor(e, t, n) {
    var _a, _b;
    let r = e.selectionStart, i = e.value;
    if (n(), r === null || r === i.length && !t) return;
    let a = e.value, o = i.slice(0, r), s = a.slice(0, r), c = (_a = this.processInput(e, o)) == null ? void 0 : _a.unmasked, l = (_b = this.processInput(e, s)) == null ? void 0 : _b.unmasked;
    if (c === void 0 || l === void 0) return;
    let u = r;
    o !== s && (u += t ? a.length - i.length : c.length - l.length), e.setSelectionRange(u, u);
  }
  setValue(e, t) {
    let n = this.processInput(e, t);
    n !== void 0 && (e.value = n.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((e2) => e2(n)) : this.options.onMaska(n)), e.dispatchEvent(new CustomEvent("maska", { detail: n })), e.dispatchEvent(new CustomEvent("input", { detail: n.masked })));
  }
  processInput(e, t) {
    let n = this.items.get(e);
    if (n === void 0) return;
    let r = t ?? e.value;
    this.options.preProcess != null && (r = this.options.preProcess(r));
    let i = n.masked(r);
    return this.options.postProcess != null && (i = this.options.postProcess(i)), {
      masked: i,
      unmasked: n.unmasked(r),
      completed: n.completed(r)
    };
  }
};
var j = /* @__PURE__ */ new WeakMap();
var M = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  let n = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : n && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
};
var N = (e, t) => {
  var n;
  let r = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (r == null || (r == null ? void 0 : r.type) === "file") return;
  let i = {};
  if (t.value != null && (i = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    let e2 = (e3) => {
      M(t, t.modifiers.unmasked ? e3.unmasked : t.modifiers.completed ? e3.completed : e3.masked);
    };
    i.onMaska = i.onMaska == null ? e2 : Array.isArray(i.onMaska) ? [...i.onMaska, e2] : [i.onMaska, e2];
  }
  j.has(r) ? (n = j.get(r)) == null || n.update(i) : j.set(r, new De(r, i));
};
var P = {
  name: "FbRow",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    noGutters: {
      type: Boolean,
      default: false
    }
  },
  setup(e, { slots: t }) {
    return () => {
      var _a;
      return h(e.tag, { class: ["fb-row", { "fb-no-gutters": e.noGutters }] }, (_a = t.default) == null ? void 0 : _a.call(t));
    };
  }
};
var Oe = [
  "sm",
  "md",
  "lg",
  "xl"
];
var F = {
  name: "FbCol",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    cols: {
      type: [String, Number],
      default: null
    },
    sm: {
      type: [String, Number],
      default: null
    },
    md: {
      type: [String, Number],
      default: null
    },
    lg: {
      type: [String, Number],
      default: null
    },
    xl: {
      type: [String, Number],
      default: null
    }
  },
  setup(e, { slots: t }) {
    let n = "fb-col";
    return () => {
      var _a;
      let r = [n];
      return e.cols && r.push(`${n}-${e.cols}`), Oe.forEach((t2) => {
        e[t2] && r.push(`${n}-${t2}-${e[t2]}`);
      }), h(e.tag, { class: r }, (_a = t.default) == null ? void 0 : _a.call(t));
    };
  }
};
var ke = {
  name: "FbInputBlock",
  props: {
    id: {
      type: String,
      default: () => `fb-field-${Math.random().toString(36).slice(2, 9)}`
    },
    label: {
      type: String,
      default: null
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    labelClass: {
      type: [
        String,
        Array,
        Object
      ],
      default: ""
    },
    state: {
      type: Boolean,
      default: null
    },
    invalidFeedback: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: null
    },
    descriptionClass: {
      type: [
        String,
        Array,
        Object
      ],
      default: ""
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    },
    labelFor: {
      type: [String, Boolean],
      default: true
    }
  },
  setup(e, { slots: t }) {
    let n = "fb-input-block", i = `${n}__label`, a = computed(() => `${e.id}__feedback`), o = computed(() => `${e.id}__description`);
    return () => {
      let r = e.labelFor !== false, s = r ? "label" : "span", c = r ? {
        id: `${e.id}__label`,
        for: e.id
      } : { id: `${e.id}__label` }, l = e.label ? h(s, {
        ...c,
        class: [
          i,
          e.labelClass,
          {
            [`${i}--block`]: !r,
            [`${i}--sr-only`]: e.labelSrOnly,
            [`${i}--${e.labelAlign}`]: e.labelAlign
          }
        ]
      }, e.label) : null, u = e.description ? h("div", {
        id: o.value,
        class: [`${n}__description`, e.descriptionClass]
      }, e.description) : null, d = e.state === false && e.invalidFeedback ? h("div", {
        id: a.value,
        class: `${n}__feedback`,
        style: { display: "block" },
        "aria-live": "assertive"
      }, e.invalidFeedback) : null, p = t.default ? t.default({
        id: e.id,
        state: e.state,
        ariaDescribedby: [e.description ? o.value : null, e.state === false && e.invalidFeedback ? a.value : null].filter(Boolean).join(" ")
      }) : null;
      return h("div", { class: n }, [
        l,
        p,
        d,
        u
      ]);
    };
  }
};
var Ae = {
  name: "FbInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    formatter: {
      type: Function,
      default: void 0
    },
    state: {
      type: Boolean,
      default: null
    },
    mask: {
      type: [String, Object],
      default: null
    },
    limit: {
      type: [Number, String],
      default: null
    }
  },
  emits: [
    "update:modelValue",
    "blur",
    "focus"
  ],
  setup(e, { emit: t, attrs: n }) {
    let i = "fb-input-block__control", a = resolveDirective("maska"), o = resolveDirective("limit-chars"), s = (n2) => {
      let r = n2.target.value;
      typeof e.formatter == "function" && (r = e.formatter(r, n2)), t("update:modelValue", r);
    }, c = (e2) => {
      t("blur", e2);
    }, l = (e2) => {
      t("focus", e2);
    };
    return () => {
      let t2 = `fb-input-${Math.random().toString(36).slice(2, 9)}`, u = computed(() => n.id || t2), d = h("input", {
        ...n,
        id: u.value,
        class: [i, {
          [`${i}--valid`]: e.state === true,
          [`${i}--invalid`]: e.state === false
        }],
        value: e.modelValue,
        onInput: s,
        onBlur: c,
        onFocus: l
      }), p = [];
      return e.mask && a && p.push([a, e.mask]), e.limit && o && p.push([o, e.limit]), withDirectives(d, p);
    };
  }
};
var je = Object.defineProperty;
var Me = Object.defineProperties;
var Ne = Object.getOwnPropertyDescriptors;
var Pe = Object.getOwnPropertySymbols;
var I = Object.prototype.hasOwnProperty;
var Fe = Object.prototype.propertyIsEnumerable;
var L = (e, t, n) => t in e ? je(e, t, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: n
}) : e[t] = n;
var R = (e, t) => {
  for (var n in t || (t = {})) I.call(t, n) && L(e, n, t[n]);
  if (Pe) for (var n of Pe(t)) Fe.call(t, n) && L(e, n, t[n]);
  return e;
};
var z = (e, t) => Me(e, Ne(t));
var Ie = {
  props: { autoscroll: {
    type: Boolean,
    default: true
  } },
  watch: {
    typeAheadPointer() {
      this.autoscroll && this.maybeAdjustScroll();
    },
    open(e) {
      this.autoscroll && e && this.$nextTick(() => this.maybeAdjustScroll());
    }
  },
  methods: {
    maybeAdjustScroll() {
      var _a;
      let e = ((_a = this.$refs.dropdownMenu) == null ? void 0 : _a.children[this.typeAheadPointer]) || false;
      if (e) {
        let t = this.getDropdownViewport(), { top: n, bottom: r, height: i } = e.getBoundingClientRect();
        if (n < t.top) return this.$refs.dropdownMenu.scrollTop = e.offsetTop;
        if (r > t.bottom) return this.$refs.dropdownMenu.scrollTop = e.offsetTop - (t.height - i);
      }
    },
    getDropdownViewport() {
      return this.$refs.dropdownMenu ? this.$refs.dropdownMenu.getBoundingClientRect() : {
        height: 0,
        top: 0,
        bottom: 0
      };
    }
  }
};
var B = {
  data() {
    return { typeAheadPointer: -1 };
  },
  watch: {
    filteredOptions() {
      for (let e = 0; e < this.filteredOptions.length; e++) if (this.selectable(this.filteredOptions[e])) {
        this.typeAheadPointer = e;
        break;
      }
    },
    open(e) {
      e && this.typeAheadToLastSelected();
    },
    selectedValue() {
      this.open && this.typeAheadToLastSelected();
    }
  },
  methods: {
    typeAheadUp() {
      for (let e = this.typeAheadPointer - 1; e >= 0; e--) if (this.selectable(this.filteredOptions[e])) {
        this.typeAheadPointer = e;
        break;
      }
    },
    typeAheadDown() {
      for (let e = this.typeAheadPointer + 1; e < this.filteredOptions.length; e++) if (this.selectable(this.filteredOptions[e])) {
        this.typeAheadPointer = e;
        break;
      }
    },
    typeAheadSelect() {
      let e = this.filteredOptions[this.typeAheadPointer];
      e && this.selectable(e) && this.select(e);
    },
    typeAheadToLastSelected() {
      this.typeAheadPointer = this.selectedValue.length === 0 ? -1 : this.filteredOptions.indexOf(this.selectedValue[this.selectedValue.length - 1]);
    }
  }
};
var Le = {
  props: { loading: {
    type: Boolean,
    default: false
  } },
  data() {
    return { mutableLoading: false };
  },
  watch: {
    search() {
      this.$emit("search", this.search, this.toggleLoading);
    },
    loading(e) {
      this.mutableLoading = e;
    }
  },
  methods: { toggleLoading(e = null) {
    return e == null ? this.mutableLoading = !this.mutableLoading : this.mutableLoading = e;
  } }
};
var Re = (e, t) => {
  let n = e.__vccOpts || e;
  for (let [e2, r] of t) n[e2] = r;
  return n;
};
var ze = {};
var Be = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "10",
  height: "10"
};
var Ve = [createBaseVNode("path", { d: "M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" }, null, -1)];
function He(e, t) {
  return openBlock(), createElementBlock("svg", Be, Ve);
}
var Ue = Re(ze, [["render", He]]);
var We = {};
var V = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "10"
};
var Ge = [createBaseVNode("path", { d: "M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z" }, null, -1)];
function Ke(e, t) {
  return openBlock(), createElementBlock("svg", V, Ge);
}
var qe = {
  Deselect: Ue,
  OpenIndicator: Re(We, [["render", Ke]])
};
var Je = {
  mounted(e, { instance: t }) {
    if (t.appendToBody) {
      let { height: n, top: r, left: i, width: a } = t.$refs.toggle.getBoundingClientRect(), o = window.scrollX || window.pageXOffset, s = window.scrollY || window.pageYOffset;
      e.unbindPosition = t.calculatePosition(e, t, {
        width: a + "px",
        left: o + i + "px",
        top: s + r + n + "px"
      }), document.body.appendChild(e);
    }
  },
  unmounted(e, { instance: t }) {
    t.appendToBody && (e.unbindPosition && typeof e.unbindPosition == "function" && e.unbindPosition(), e.parentNode && e.parentNode.removeChild(e));
  }
};
function Ye(e) {
  let t = {};
  return Object.keys(e).sort().forEach((n) => {
    t[n] = e[n];
  }), JSON.stringify(t);
}
var H = 0;
function Xe() {
  return ++H;
}
var Ze = {
  components: R({}, qe),
  directives: { appendToBody: Je },
  mixins: [
    Ie,
    B,
    Le
  ],
  compatConfig: { MODE: 3 },
  emits: [
    "open",
    "close",
    "update:modelValue",
    "search",
    "search:compositionstart",
    "search:compositionend",
    "search:keydown",
    "search:blur",
    "search:focus",
    "search:input",
    "option:created",
    "option:selecting",
    "option:selected",
    "option:deselecting",
    "option:deselected"
  ],
  props: {
    modelValue: {},
    components: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    deselectFromDropdown: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    transition: {
      type: String,
      default: "vs__fade"
    },
    clearSearchOnSelect: {
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: "label"
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    reduce: {
      type: Function,
      default: (e) => e
    },
    selectable: {
      type: Function,
      default: (e) => true
    },
    getOptionLabel: {
      type: Function,
      default(e) {
        return typeof e == "object" ? e.hasOwnProperty(this.label) ? e[this.label] : console.warn(`[vue-select warn]: Label key "option.${this.label}" does not exist in options object ${JSON.stringify(e)}.
https://vue-select.org/api/props.html#getoptionlabel`) : e;
      }
    },
    getOptionKey: {
      type: Function,
      default(e) {
        if (typeof e != "object") return e;
        try {
          return e.hasOwnProperty("id") ? e.id : Ye(e);
        } catch (t) {
          return console.warn("[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.\nhttps://vue-select.org/api/props.html#getoptionkey", e, t);
        }
      }
    },
    onTab: {
      type: Function,
      default: function() {
        this.selectOnTab && !this.isComposing && this.typeAheadSelect();
      }
    },
    taggable: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: null
    },
    pushTags: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    filterBy: {
      type: Function,
      default(e, t, n) {
        return (t || "").toLocaleLowerCase().indexOf(n.toLocaleLowerCase()) > -1;
      }
    },
    filter: {
      type: Function,
      default(e, t) {
        return e.filter((e2) => {
          let n = this.getOptionLabel(e2);
          return typeof n == "number" && (n = n.toString()), this.filterBy(e2, n, t);
        });
      }
    },
    createOption: {
      type: Function,
      default(e) {
        return typeof this.optionList[0] == "object" ? { [this.label]: e } : e;
      }
    },
    resetOnOptionsChange: {
      default: false,
      validator: (e) => ["function", "boolean"].includes(typeof e)
    },
    clearSearchOnBlur: {
      type: Function,
      default: function({ clearSearchOnSelect: e, multiple: t }) {
        return e && !t;
      }
    },
    noDrop: {
      type: Boolean,
      default: false
    },
    inputId: { type: String },
    dir: {
      type: String,
      default: "auto"
    },
    selectOnTab: {
      type: Boolean,
      default: false
    },
    selectOnKeyCodes: {
      type: Array,
      default: () => [13]
    },
    searchInputQuerySelector: {
      type: String,
      default: "[type=search]"
    },
    mapKeydown: {
      type: Function,
      default: (e, t) => e
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    calculatePosition: {
      type: Function,
      default(e, t, { width: n, top: r, left: i }) {
        e.style.top = r, e.style.left = i, e.style.width = n;
      }
    },
    dropdownShouldOpen: {
      type: Function,
      default({ noDrop: e, open: t, mutableLoading: n }) {
        return e ? false : t && !n;
      }
    },
    uid: {
      type: [String, Number],
      default: () => Xe()
    }
  },
  data() {
    return {
      search: "",
      open: false,
      isComposing: false,
      pushedTags: [],
      _value: [],
      deselectButtons: []
    };
  },
  computed: {
    isReducingValues() {
      return this.$props.reduce !== this.$options.props.reduce.default;
    },
    isTrackingValues() {
      return this.modelValue === void 0 || this.isReducingValues;
    },
    selectedValue() {
      let e = this.modelValue;
      return this.isTrackingValues && (e = this.$data._value), e != null && e !== "" ? [].concat(e) : [];
    },
    optionList() {
      return this.options.concat(this.pushTags ? this.pushedTags : []);
    },
    searchEl() {
      return this.$slots.search ? this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector) : this.$refs.search;
    },
    scope() {
      let e = {
        search: this.search,
        loading: this.loading,
        searching: this.searching,
        filteredOptions: this.filteredOptions
      };
      return {
        search: {
          attributes: R({
            disabled: this.disabled,
            placeholder: this.searchPlaceholder,
            tabindex: this.tabindex,
            readonly: !this.searchable,
            id: this.inputId,
            "aria-autocomplete": "list",
            "aria-labelledby": `vs${this.uid}__combobox`,
            "aria-controls": `vs${this.uid}__listbox`,
            ref: "search",
            type: "search",
            autocomplete: this.autocomplete,
            value: this.search
          }, this.dropdownOpen && this.filteredOptions[this.typeAheadPointer] ? { "aria-activedescendant": `vs${this.uid}__option-${this.typeAheadPointer}` } : {}),
          events: {
            compositionstart: () => this.isComposing = true,
            compositionend: () => this.isComposing = false,
            keydown: this.onSearchKeyDown,
            blur: this.onSearchBlur,
            focus: this.onSearchFocus,
            input: (e2) => this.search = e2.target.value
          }
        },
        spinner: { loading: this.mutableLoading },
        noOptions: {
          search: this.search,
          loading: this.mutableLoading,
          searching: this.searching
        },
        openIndicator: { attributes: {
          ref: "openIndicator",
          role: "presentation",
          class: "vs__open-indicator"
        } },
        listHeader: e,
        listFooter: e,
        header: z(R({}, e), { deselect: this.deselect }),
        footer: z(R({}, e), { deselect: this.deselect })
      };
    },
    childComponents() {
      return R(R({}, qe), this.components);
    },
    stateClasses() {
      return {
        "vs--open": this.dropdownOpen,
        "vs--single": !this.multiple,
        "vs--multiple": this.multiple,
        "vs--searching": this.searching && !this.noDrop,
        "vs--searchable": this.searchable && !this.noDrop,
        "vs--unsearchable": !this.searchable,
        "vs--loading": this.mutableLoading,
        "vs--disabled": this.disabled
      };
    },
    searching() {
      return !!this.search;
    },
    dropdownOpen() {
      return this.dropdownShouldOpen(this);
    },
    searchPlaceholder() {
      return this.isValueEmpty && this.placeholder ? this.placeholder : void 0;
    },
    filteredOptions() {
      let e = [].concat(this.optionList);
      if (!this.filterable && !this.taggable) return e;
      let t = this.search.length ? this.filter(e, this.search, this) : e;
      if (this.taggable && this.search.length) {
        let e2 = this.createOption(this.search);
        this.optionExists(e2) || t.unshift(e2);
      }
      return t;
    },
    isValueEmpty() {
      return this.selectedValue.length === 0;
    },
    showClearButton() {
      return !this.multiple && this.clearable && !this.open && !this.isValueEmpty;
    }
  },
  watch: {
    options(e, t) {
      !this.taggable && (typeof this.resetOnOptionsChange == "function" ? this.resetOnOptionsChange(e, t, this.selectedValue) : this.resetOnOptionsChange) && this.clearSelection(), this.modelValue && this.isTrackingValues && this.setInternalValueFromOptions(this.modelValue);
    },
    modelValue: {
      immediate: true,
      handler(e) {
        this.isTrackingValues && this.setInternalValueFromOptions(e);
      }
    },
    multiple() {
      this.clearSelection();
    },
    open(e) {
      this.$emit(e ? "open" : "close");
    }
  },
  created() {
    this.mutableLoading = this.loading;
  },
  methods: {
    setInternalValueFromOptions(e) {
      Array.isArray(e) ? this.$data._value = e.map((e2) => this.findOptionFromReducedValue(e2)) : this.$data._value = this.findOptionFromReducedValue(e);
    },
    select(e) {
      this.$emit("option:selecting", e), this.isOptionSelected(e) ? this.deselectFromDropdown && (this.clearable || this.multiple && this.selectedValue.length > 1) && this.deselect(e) : (this.taggable && !this.optionExists(e) && (this.$emit("option:created", e), this.pushTag(e)), this.multiple && (e = this.selectedValue.concat(e)), this.updateValue(e), this.$emit("option:selected", e)), this.onAfterSelect(e);
    },
    deselect(e) {
      this.$emit("option:deselecting", e), this.updateValue(this.selectedValue.filter((t) => !this.optionComparator(t, e))), this.$emit("option:deselected", e);
    },
    clearSelection() {
      this.updateValue(this.multiple ? [] : null);
    },
    onAfterSelect(e) {
      this.closeOnSelect && (this.open = !this.open, this.searchEl.blur()), this.clearSearchOnSelect && (this.search = "");
    },
    updateValue(e) {
      this.modelValue === void 0 && (this.$data._value = e), e !== null && (e = Array.isArray(e) ? e.map((e2) => this.reduce(e2)) : this.reduce(e)), this.$emit("update:modelValue", e);
    },
    toggleDropdown(e) {
      let t = e.target !== this.searchEl;
      t && e.preventDefault();
      let n = [...this.deselectButtons || [], this.$refs.clearButton];
      if (this.searchEl === void 0 || n.filter(Boolean).some((t2) => t2.contains(e.target) || t2 === e.target)) {
        e.preventDefault();
        return;
      }
      this.open && t ? this.searchEl.blur() : this.disabled || (this.open = true, this.searchEl.focus());
    },
    isOptionSelected(e) {
      return this.selectedValue.some((t) => this.optionComparator(t, e));
    },
    isOptionDeselectable(e) {
      return this.isOptionSelected(e) && this.deselectFromDropdown;
    },
    optionComparator(e, t) {
      return this.getOptionKey(e) === this.getOptionKey(t);
    },
    findOptionFromReducedValue(e) {
      let t = (t2) => JSON.stringify(this.reduce(t2)) === JSON.stringify(e), n = [...this.options, ...this.pushedTags].filter(t);
      return n.length === 1 ? n[0] : n.find((e2) => this.optionComparator(e2, this.$data._value)) || e;
    },
    closeSearchOptions() {
      this.open = false, this.$emit("search:blur");
    },
    maybeDeleteValue() {
      if (!this.searchEl.value.length && this.selectedValue && this.selectedValue.length && this.clearable) {
        let e = null;
        this.multiple && (e = [...this.selectedValue.slice(0, this.selectedValue.length - 1)]), this.updateValue(e);
      }
    },
    optionExists(e) {
      return this.optionList.some((t) => this.optionComparator(t, e));
    },
    normalizeOptionForSlot(e) {
      return typeof e == "object" ? e : { [this.label]: e };
    },
    pushTag(e) {
      this.pushedTags.push(e);
    },
    onEscape() {
      this.search.length ? this.search = "" : this.searchEl.blur();
    },
    onSearchBlur() {
      if (this.mousedown && !this.searching) this.mousedown = false;
      else {
        let { clearSearchOnSelect: e, multiple: t } = this;
        this.clearSearchOnBlur({
          clearSearchOnSelect: e,
          multiple: t
        }) && (this.search = ""), this.closeSearchOptions();
        return;
      }
      if (this.search.length === 0 && this.options.length === 0) {
        this.closeSearchOptions();
        return;
      }
    },
    onSearchFocus() {
      this.open = true, this.$emit("search:focus");
    },
    onMousedown() {
      this.mousedown = true;
    },
    onMouseUp() {
      this.mousedown = false;
    },
    onSearchKeyDown(e) {
      let t = (e2) => (e2.preventDefault(), !this.isComposing && this.typeAheadSelect()), n = {
        8: (e2) => this.maybeDeleteValue(),
        9: (e2) => this.onTab(),
        27: (e2) => this.onEscape(),
        38: (e2) => (e2.preventDefault(), this.typeAheadUp()),
        40: (e2) => (e2.preventDefault(), this.typeAheadDown())
      };
      this.selectOnKeyCodes.forEach((e2) => n[e2] = t);
      let r = this.mapKeydown(n, this);
      if (typeof r[e.keyCode] == "function") return r[e.keyCode](e);
    }
  }
};
var Qe = ["dir"];
var $e = [
  "id",
  "aria-expanded",
  "aria-owns"
];
var et = {
  ref: "selectedOptions",
  class: "vs__selected-options"
};
var U = [
  "disabled",
  "title",
  "aria-label",
  "onClick"
];
var tt = {
  ref: "actions",
  class: "vs__actions"
};
var nt = ["disabled"];
var rt = { class: "vs__spinner" };
var it = ["id"];
var at = [
  "id",
  "aria-selected",
  "onMouseover",
  "onClick"
];
var ot = {
  key: 0,
  class: "vs__no-options"
};
var st = createTextVNode(" Sorry, no matching options. ");
var ct = ["id"];
function lt(n, r, u, f, p, h2) {
  let v = resolveDirective("append-to-body");
  return openBlock(), createElementBlock("div", {
    dir: u.dir,
    class: normalizeClass(["v-select", h2.stateClasses])
  }, [
    renderSlot(n.$slots, "header", normalizeProps(guardReactiveProps(h2.scope.header))),
    createBaseVNode("div", {
      id: `vs${u.uid}__combobox`,
      ref: "toggle",
      class: "vs__dropdown-toggle",
      role: "combobox",
      "aria-expanded": h2.dropdownOpen.toString(),
      "aria-owns": `vs${u.uid}__listbox`,
      "aria-label": "Search for option",
      onMousedown: r[1] || (r[1] = (e) => h2.toggleDropdown(e))
    }, [createBaseVNode("div", et, [(openBlock(true), createElementBlock(Fragment, null, renderList(h2.selectedValue, (e, t) => renderSlot(n.$slots, "selected-option-container", {
      option: h2.normalizeOptionForSlot(e),
      deselect: h2.deselect,
      multiple: u.multiple,
      disabled: u.disabled
    }, () => [(openBlock(), createElementBlock("span", {
      key: u.getOptionKey(e),
      class: "vs__selected"
    }, [renderSlot(n.$slots, "selected-option", normalizeProps(guardReactiveProps(h2.normalizeOptionForSlot(e))), () => [createTextVNode(toDisplayString(u.getOptionLabel(e)), 1)]), u.multiple ? (openBlock(), createElementBlock("button", {
      key: 0,
      ref_for: true,
      ref: (e2) => p.deselectButtons[t] = e2,
      disabled: u.disabled,
      type: "button",
      class: "vs__deselect",
      title: `Deselect ${u.getOptionLabel(e)}`,
      "aria-label": `Deselect ${u.getOptionLabel(e)}`,
      onClick: (t2) => h2.deselect(e)
    }, [(openBlock(), createBlock(resolveDynamicComponent(h2.childComponents.Deselect)))], 8, U)) : createCommentVNode("", true)]))])), 256)), renderSlot(n.$slots, "search", normalizeProps(guardReactiveProps(h2.scope.search)), () => [createBaseVNode("input", mergeProps({ class: "vs__search" }, h2.scope.search.attributes, toHandlers(h2.scope.search.events)), null, 16)])], 512), createBaseVNode("div", tt, [
      withDirectives(createBaseVNode("button", {
        ref: "clearButton",
        disabled: u.disabled,
        type: "button",
        class: "vs__clear",
        title: "Clear Selected",
        "aria-label": "Clear Selected",
        onClick: r[0] || (r[0] = (...e) => h2.clearSelection && h2.clearSelection(...e))
      }, [(openBlock(), createBlock(resolveDynamicComponent(h2.childComponents.Deselect)))], 8, nt), [[vShow, h2.showClearButton]]),
      renderSlot(n.$slots, "open-indicator", normalizeProps(guardReactiveProps(h2.scope.openIndicator)), () => [u.noDrop ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(h2.childComponents.OpenIndicator), normalizeProps(mergeProps({ key: 0 }, h2.scope.openIndicator.attributes)), null, 16))]),
      renderSlot(n.$slots, "spinner", normalizeProps(guardReactiveProps(h2.scope.spinner)), () => [withDirectives(createBaseVNode("div", rt, "Loading...", 512), [[vShow, n.mutableLoading]])])
    ], 512)], 40, $e),
    createVNode(Transition, { name: u.transition }, {
      default: withCtx(() => [h2.dropdownOpen ? withDirectives((openBlock(), createElementBlock("ul", {
        id: `vs${u.uid}__listbox`,
        ref: "dropdownMenu",
        key: `vs${u.uid}__listbox`,
        class: "vs__dropdown-menu",
        role: "listbox",
        tabindex: "-1",
        onMousedown: r[2] || (r[2] = withModifiers((...e) => h2.onMousedown && h2.onMousedown(...e), ["prevent"])),
        onMouseup: r[3] || (r[3] = (...e) => h2.onMouseUp && h2.onMouseUp(...e))
      }, [
        renderSlot(n.$slots, "list-header", normalizeProps(guardReactiveProps(h2.scope.listHeader))),
        (openBlock(true), createElementBlock(Fragment, null, renderList(h2.filteredOptions, (e, t) => (openBlock(), createElementBlock("li", {
          id: `vs${u.uid}__option-${t}`,
          key: u.getOptionKey(e),
          role: "option",
          class: normalizeClass(["vs__dropdown-option", {
            "vs__dropdown-option--deselect": h2.isOptionDeselectable(e) && t === n.typeAheadPointer,
            "vs__dropdown-option--selected": h2.isOptionSelected(e),
            "vs__dropdown-option--highlight": t === n.typeAheadPointer,
            "vs__dropdown-option--disabled": !u.selectable(e)
          }]),
          "aria-selected": t === n.typeAheadPointer ? true : null,
          onMouseover: (r2) => u.selectable(e) ? n.typeAheadPointer = t : null,
          onClick: withModifiers((t2) => u.selectable(e) ? h2.select(e) : null, ["prevent", "stop"])
        }, [renderSlot(n.$slots, "option", normalizeProps(guardReactiveProps(h2.normalizeOptionForSlot(e))), () => [createTextVNode(toDisplayString(u.getOptionLabel(e)), 1)])], 42, at))), 128)),
        h2.filteredOptions.length === 0 ? (openBlock(), createElementBlock("li", ot, [renderSlot(n.$slots, "no-options", normalizeProps(guardReactiveProps(h2.scope.noOptions)), () => [st])])) : createCommentVNode("", true),
        renderSlot(n.$slots, "list-footer", normalizeProps(guardReactiveProps(h2.scope.listFooter)))
      ], 40, it)), [[v]]) : (openBlock(), createElementBlock("ul", {
        key: 1,
        id: `vs${u.uid}__listbox`,
        role: "listbox",
        style: {
          display: "none",
          visibility: "hidden"
        }
      }, null, 8, ct))]),
      _: 3
    }, 8, ["name"]),
    renderSlot(n.$slots, "footer", normalizeProps(guardReactiveProps(h2.scope.footer)))
  ], 10, Qe);
}
var ut = Re(Ze, [["render", lt]]);
var dt = [
  "onChange",
  "onClose",
  "onDayCreate",
  "onDestroy",
  "onKeyDown",
  "onMonthChange",
  "onOpen",
  "onParseConfig",
  "onReady",
  "onValueUpdate",
  "onYearChange",
  "onPreCalendarPosition"
];
var ft = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window == "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: function(e) {
    return typeof console < "u" && console.warn(e);
  },
  getWeek: function(e) {
    var t = new Date(e.getTime());
    t.setHours(0, 0, 0, 0), t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7);
    var n = new Date(t.getFullYear(), 0, 4);
    return 1 + Math.round(((t.getTime() - n.getTime()) / 864e5 - 3 + (n.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: /* @__PURE__ */ new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: void 0,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};
var pt = {
  weekdays: {
    shorthand: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  daysInMonth: [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ],
  firstDayOfWeek: 0,
  ordinal: function(e) {
    var t = e % 100;
    if (t > 3 && t < 21) return "th";
    switch (t % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};
var W = function(e, t) {
  return t === void 0 && (t = 2), ("000" + e).slice(t * -1);
};
var G = function(e) {
  return +(e === true);
};
function mt(e, t) {
  var n;
  return function() {
    var r = this, i = arguments;
    clearTimeout(n), n = setTimeout(function() {
      return e.apply(r, i);
    }, t);
  };
}
var ht = function(e) {
  return e instanceof Array ? e : [e];
};
function K(e, t, n) {
  if (n === true) return e.classList.add(t);
  e.classList.remove(t);
}
function q(e, t, n) {
  var r = window.document.createElement(e);
  return t || (t = ""), n || (n = ""), r.className = t, n !== void 0 && (r.textContent = n), r;
}
function gt(e) {
  for (; e.firstChild; ) e.removeChild(e.firstChild);
}
function _t(e, t) {
  if (t(e)) return e;
  if (e.parentNode) return _t(e.parentNode, t);
}
function vt(e, t) {
  var n = q("div", "numInputWrapper"), r = q("input", "numInput " + e), i = q("span", "arrowUp"), a = q("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? r.type = "number" : (r.type = "text", r.pattern = "\\d*"), t !== void 0) for (var o in t) r.setAttribute(o, t[o]);
  return n.appendChild(r), n.appendChild(i), n.appendChild(a), n;
}
function J(e) {
  try {
    return typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
  } catch {
    return e.target;
  }
}
var yt = function() {
};
var bt = function(e, t, n) {
  return n.months[t ? "shorthand" : "longhand"][e];
};
var xt = {
  D: yt,
  F: function(e, t, n) {
    e.setMonth(n.months.longhand.indexOf(t));
  },
  G: function(e, t) {
    e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(t));
  },
  H: function(e, t) {
    e.setHours(parseFloat(t));
  },
  J: function(e, t) {
    e.setDate(parseFloat(t));
  },
  K: function(e, t, n) {
    e.setHours(e.getHours() % 12 + 12 * G(new RegExp(n.amPM[1], "i").test(t)));
  },
  M: function(e, t, n) {
    e.setMonth(n.months.shorthand.indexOf(t));
  },
  S: function(e, t) {
    e.setSeconds(parseFloat(t));
  },
  U: function(e, t) {
    return new Date(parseFloat(t) * 1e3);
  },
  W: function(e, t, n) {
    var r = parseInt(t), i = new Date(e.getFullYear(), 0, 2 + (r - 1) * 7, 0, 0, 0, 0);
    return i.setDate(i.getDate() - i.getDay() + n.firstDayOfWeek), i;
  },
  Y: function(e, t) {
    e.setFullYear(parseFloat(t));
  },
  Z: function(e, t) {
    return new Date(t);
  },
  d: function(e, t) {
    e.setDate(parseFloat(t));
  },
  h: function(e, t) {
    e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(t));
  },
  i: function(e, t) {
    e.setMinutes(parseFloat(t));
  },
  j: function(e, t) {
    e.setDate(parseFloat(t));
  },
  l: yt,
  m: function(e, t) {
    e.setMonth(parseFloat(t) - 1);
  },
  n: function(e, t) {
    e.setMonth(parseFloat(t) - 1);
  },
  s: function(e, t) {
    e.setSeconds(parseFloat(t));
  },
  u: function(e, t) {
    return new Date(parseFloat(t));
  },
  w: yt,
  y: function(e, t) {
    e.setFullYear(2e3 + parseFloat(t));
  }
};
var Y = {
  D: "",
  F: "",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
var St = {
  Z: function(e) {
    return e.toISOString();
  },
  D: function(e, t, n) {
    return t.weekdays.shorthand[St.w(e, t, n)];
  },
  F: function(e, t, n) {
    return bt(St.n(e, t, n) - 1, false, t);
  },
  G: function(e, t, n) {
    return W(St.h(e, t, n));
  },
  H: function(e) {
    return W(e.getHours());
  },
  J: function(e, t) {
    return t.ordinal === void 0 ? e.getDate() : e.getDate() + t.ordinal(e.getDate());
  },
  K: function(e, t) {
    return t.amPM[G(e.getHours() > 11)];
  },
  M: function(e, t) {
    return bt(e.getMonth(), true, t);
  },
  S: function(e) {
    return W(e.getSeconds());
  },
  U: function(e) {
    return e.getTime() / 1e3;
  },
  W: function(e, t, n) {
    return n.getWeek(e);
  },
  Y: function(e) {
    return W(e.getFullYear(), 4);
  },
  d: function(e) {
    return W(e.getDate());
  },
  h: function(e) {
    return e.getHours() % 12 ? e.getHours() % 12 : 12;
  },
  i: function(e) {
    return W(e.getMinutes());
  },
  j: function(e) {
    return e.getDate();
  },
  l: function(e, t) {
    return t.weekdays.longhand[e.getDay()];
  },
  m: function(e) {
    return W(e.getMonth() + 1);
  },
  n: function(e) {
    return e.getMonth() + 1;
  },
  s: function(e) {
    return e.getSeconds();
  },
  u: function(e) {
    return e.getTime();
  },
  w: function(e) {
    return e.getDay();
  },
  y: function(e) {
    return String(e.getFullYear()).substring(2);
  }
};
var Ct = function(e) {
  var t = e.config, n = t === void 0 ? ft : t, r = e.l10n, i = r === void 0 ? pt : r, a = e.isMobile, o = a === void 0 ? false : a;
  return function(e2, t2, r2) {
    var a2 = r2 || i;
    return n.formatDate !== void 0 && !o ? n.formatDate(e2, t2, a2) : t2.split("").map(function(t3, r3, i2) {
      return St[t3] && i2[r3 - 1] !== "\\" ? St[t3](e2, a2, n) : t3 === "\\" ? "" : t3;
    }).join("");
  };
};
var wt = function(e) {
  var t = e.config, n = t === void 0 ? ft : t, r = e.l10n, i = r === void 0 ? pt : r;
  return function(e2, t2, r2, a) {
    if (!(e2 !== 0 && !e2)) {
      var o = a || i, s, c = e2;
      if (e2 instanceof Date) s = new Date(e2.getTime());
      else if (typeof e2 != "string" && e2.toFixed !== void 0) s = new Date(e2);
      else if (typeof e2 == "string") {
        var l = t2 || (n || ft).dateFormat, u = String(e2).trim();
        if (u === "today") s = /* @__PURE__ */ new Date(), r2 = true;
        else if (n && n.parseDate) s = n.parseDate(e2, l);
        else if (/Z$/.test(u) || /GMT$/.test(u)) s = new Date(e2);
        else {
          for (var d = void 0, f = [], p = 0, m = 0, h2 = ""; p < l.length; p++) {
            var g = l[p], _ = g === "\\", v = l[p - 1] === "\\" || _;
            if (Y[g] && !v) {
              h2 += Y[g];
              var y = new RegExp(h2).exec(e2);
              y && (d = true) && f[g === "Y" ? "unshift" : "push"]({
                fn: xt[g],
                val: y[++m]
              });
            } else _ || (h2 += ".");
          }
          s = !n || !n.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), f.forEach(function(e3) {
            var t3 = e3.fn, n2 = e3.val;
            return s = t3(s, n2, o) || s;
          }), s = d ? s : void 0;
        }
      }
      if (!(s instanceof Date && !isNaN(s.getTime()))) {
        n.errorHandler(Error("Invalid date provided: " + c));
        return;
      }
      return r2 === true && s.setHours(0, 0, 0, 0), s;
    }
  };
};
function X(e, t, n) {
  return n === void 0 && (n = true), n === false ? e.getTime() - t.getTime() : new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(t.getTime()).setHours(0, 0, 0, 0);
}
var Tt = function(e, t, n) {
  return e > Math.min(t, n) && e < Math.max(t, n);
};
var Et = function(e, t, n) {
  return e * 3600 + t * 60 + n;
};
var Dt = function(e) {
  var t = Math.floor(e / 3600), n = (e - t * 3600) / 60;
  return [
    t,
    n,
    e - t * 3600 - n * 60
  ];
};
var Ot = { DAY: 864e5 };
function kt(e) {
  var t = e.defaultHour, n = e.defaultMinute, r = e.defaultSeconds;
  if (e.minDate !== void 0) {
    var i = e.minDate.getHours(), a = e.minDate.getMinutes(), o = e.minDate.getSeconds();
    t < i && (t = i), t === i && n < a && (n = a), t === i && n === a && r < o && (r = e.minDate.getSeconds());
  }
  if (e.maxDate !== void 0) {
    var s = e.maxDate.getHours(), c = e.maxDate.getMinutes();
    t = Math.min(t, s), t === s && (n = Math.min(c, n)), t === s && n === c && (r = e.maxDate.getSeconds());
  }
  return {
    hours: t,
    minutes: n,
    seconds: r
  };
}
typeof Object.assign != "function" && (Object.assign = function(e) {
  var t = [...arguments].slice(1);
  if (!e) throw TypeError("Cannot convert undefined or null to object");
  for (var n = function(t2) {
    t2 && Object.keys(t2).forEach(function(n2) {
      return e[n2] = t2[n2];
    });
  }, r = 0, i = t; r < i.length; r++) {
    var a = i[r];
    n(a);
  }
  return e;
});
var Z = function() {
  return Z = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e;
  }, Z.apply(this, arguments);
};
var At = function() {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
  for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
  return r;
};
var jt = 300;
function Mt(e, t) {
  var n = {
    config: Z(Z({}, ft), Q.defaultConfig),
    l10n: pt
  };
  n.parseDate = wt({
    config: n.config,
    l10n: n.l10n
  }), n._handlers = [], n.pluginElements = [], n.loadedPlugins = [], n._bind = h2, n._setHoursFromDate = f, n._positionCalendar = we2, n.changeMonth = ue2, n.changeYear = me2, n.clear = de2, n.close = D2, n.onMouseOver = ve2, n._createElement = q, n.createDay = x, n.destroy = fe2, n.isEnabled = k2, n.jumpToDate = v, n.updateValue = B2, n.open = be2, n.redraw = De2, n.set = P2, n.setDate = F2, n.toggle = Pe2;
  function r() {
    n.utils = { getDaysInMonth: function(e2, t2) {
      return e2 === void 0 && (e2 = n.currentMonth), t2 === void 0 && (t2 = n.currentYear), e2 === 1 && (t2 % 4 == 0 && t2 % 100 != 0 || t2 % 400 == 0) ? 29 : n.l10n.daysInMonth[e2];
    } };
  }
  function i() {
    n.element = n.input = e, n.isOpen = false, Se2(), Ce2(), je2(), Ae2(), r(), n.isMobile || ee(), _(), (n.selectedDates.length || n.config.noCalendar) && (n.config.enableTime && f(n.config.noCalendar ? n.latestSelectedDateObj : void 0), B2(false)), s();
    var t2 = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !n.isMobile && t2 && we2(), I2("onReady");
  }
  function a() {
    var _a;
    return ((_a = n.calendarContainer) == null ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
  }
  function o(e2) {
    return e2.bind(n);
  }
  function s() {
    var e2 = n.config;
    e2.weekNumbers === false && e2.showMonths === 1 || e2.noCalendar !== true && window.requestAnimationFrame(function() {
      if (n.calendarContainer !== void 0 && (n.calendarContainer.style.visibility = "hidden", n.calendarContainer.style.display = "block"), n.daysContainer !== void 0) {
        var t2 = (n.days.offsetWidth + 1) * e2.showMonths;
        n.daysContainer.style.width = t2 + "px", n.calendarContainer.style.width = t2 + (n.weekWrapper === void 0 ? 0 : n.weekWrapper.offsetWidth) + "px", n.calendarContainer.style.removeProperty("visibility"), n.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function c(e2) {
    if (n.selectedDates.length === 0) {
      var t2 = n.config.minDate === void 0 || X(/* @__PURE__ */ new Date(), n.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(n.config.minDate.getTime()), r2 = kt(n.config);
      t2.setHours(r2.hours, r2.minutes, r2.seconds, t2.getMilliseconds()), n.selectedDates = [t2], n.latestSelectedDateObj = t2;
    }
    e2 !== void 0 && e2.type !== "blur" && Re2(e2);
    var i2 = n._input.value;
    d(), B2(), n._input.value !== i2 && n._debouncedChange();
  }
  function l(e2, t2) {
    return e2 % 12 + 12 * G(t2 === n.l10n.amPM[1]);
  }
  function u(e2) {
    switch (e2 % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return e2 % 12;
    }
  }
  function d() {
    if (!(n.hourElement === void 0 || n.minuteElement === void 0)) {
      var e2 = (parseInt(n.hourElement.value.slice(-2), 10) || 0) % 24, t2 = (parseInt(n.minuteElement.value, 10) || 0) % 60, r2 = n.secondElement === void 0 ? 0 : (parseInt(n.secondElement.value, 10) || 0) % 60;
      n.amPM !== void 0 && (e2 = l(e2, n.amPM.textContent));
      var i2 = n.config.minTime !== void 0 || n.config.minDate && n.minDateHasTime && n.latestSelectedDateObj && X(n.latestSelectedDateObj, n.config.minDate, true) === 0, a2 = n.config.maxTime !== void 0 || n.config.maxDate && n.maxDateHasTime && n.latestSelectedDateObj && X(n.latestSelectedDateObj, n.config.maxDate, true) === 0;
      if (n.config.maxTime !== void 0 && n.config.minTime !== void 0 && n.config.minTime > n.config.maxTime) {
        var o2 = Et(n.config.minTime.getHours(), n.config.minTime.getMinutes(), n.config.minTime.getSeconds()), s2 = Et(n.config.maxTime.getHours(), n.config.maxTime.getMinutes(), n.config.maxTime.getSeconds()), c2 = Et(e2, t2, r2);
        if (c2 > s2 && c2 < o2) {
          var u2 = Dt(o2);
          e2 = u2[0], t2 = u2[1], r2 = u2[2];
        }
      } else {
        if (a2) {
          var d2 = n.config.maxTime === void 0 ? n.config.maxDate : n.config.maxTime;
          e2 = Math.min(e2, d2.getHours()), e2 === d2.getHours() && (t2 = Math.min(t2, d2.getMinutes())), t2 === d2.getMinutes() && (r2 = Math.min(r2, d2.getSeconds()));
        }
        if (i2) {
          var f2 = n.config.minTime === void 0 ? n.config.minDate : n.config.minTime;
          e2 = Math.max(e2, f2.getHours()), e2 === f2.getHours() && t2 < f2.getMinutes() && (t2 = f2.getMinutes()), t2 === f2.getMinutes() && (r2 = Math.max(r2, f2.getSeconds()));
        }
      }
      p(e2, t2, r2);
    }
  }
  function f(e2) {
    var t2 = e2 || n.latestSelectedDateObj;
    t2 && t2 instanceof Date && p(t2.getHours(), t2.getMinutes(), t2.getSeconds());
  }
  function p(e2, t2, r2) {
    n.latestSelectedDateObj !== void 0 && n.latestSelectedDateObj.setHours(e2 % 24, t2, r2 || 0, 0), !(!n.hourElement || !n.minuteElement || n.isMobile) && (n.hourElement.value = W(n.config.time_24hr ? e2 : (12 + e2) % 12 + 12 * G(e2 % 12 == 0)), n.minuteElement.value = W(t2), n.amPM !== void 0 && (n.amPM.textContent = n.l10n.amPM[G(e2 >= 12)]), n.secondElement !== void 0 && (n.secondElement.value = W(r2)));
  }
  function m(e2) {
    var t2 = J(e2), n2 = parseInt(t2.value) + (e2.delta || 0);
    (n2 / 1e3 > 1 || e2.key === "Enter" && !/[^\d]/.test(n2.toString())) && me2(n2);
  }
  function h2(e2, t2, r2, i2) {
    if (t2 instanceof Array) return t2.forEach(function(t3) {
      return h2(e2, t3, r2, i2);
    });
    if (e2 instanceof Array) return e2.forEach(function(e3) {
      return h2(e3, t2, r2, i2);
    });
    e2.addEventListener(t2, r2, i2), n._handlers.push({ remove: function() {
      return e2.removeEventListener(t2, r2, i2);
    } });
  }
  function g() {
    I2("onChange");
  }
  function _() {
    if (n.config.wrap && [
      "open",
      "close",
      "toggle",
      "clear"
    ].forEach(function(e3) {
      Array.prototype.forEach.call(n.element.querySelectorAll("[data-" + e3 + "]"), function(t2) {
        return h2(t2, "click", n[e3]);
      });
    }), n.isMobile) {
      Ne2();
      return;
    }
    var e2 = mt(ye2, 50);
    n._debouncedChange = mt(g, jt), n.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && h2(n.daysContainer, "mouseover", function(e3) {
      n.config.mode === "range" && ve2(J(e3));
    }), h2(n._input, "keydown", _e2), n.calendarContainer !== void 0 && h2(n.calendarContainer, "keydown", _e2), !n.config.inline && !n.config.static && h2(window, "resize", e2), window.ontouchstart === void 0 ? h2(window.document, "mousedown", pe2) : h2(window.document, "touchstart", pe2), h2(window.document, "focus", pe2, { capture: true }), n.config.clickOpens === true && (h2(n._input, "focus", n.open), h2(n._input, "click", n.open)), n.daysContainer !== void 0 && (h2(n.monthNav, "click", Le2), h2(n.monthNav, ["keyup", "increment"], m), h2(n.daysContainer, "click", M2)), n.timeContainer !== void 0 && n.minuteElement !== void 0 && n.hourElement !== void 0 && (h2(n.timeContainer, ["increment"], c), h2(n.timeContainer, "blur", c, { capture: true }), h2(n.timeContainer, "click", y), h2([n.hourElement, n.minuteElement], ["focus", "click"], function(e3) {
      return J(e3).select();
    }), n.secondElement !== void 0 && h2(n.secondElement, "focus", function() {
      return n.secondElement && n.secondElement.select();
    }), n.amPM !== void 0 && h2(n.amPM, "click", function(e3) {
      c(e3);
    })), n.config.allowInput && h2(n._input, "blur", ge2);
  }
  function v(e2, t2) {
    var r2 = e2 === void 0 ? n.latestSelectedDateObj || (n.config.minDate && n.config.minDate > n.now ? n.config.minDate : n.config.maxDate && n.config.maxDate < n.now ? n.config.maxDate : n.now) : n.parseDate(e2), i2 = n.currentYear, a2 = n.currentMonth;
    try {
      r2 !== void 0 && (n.currentYear = r2.getFullYear(), n.currentMonth = r2.getMonth());
    } catch (e3) {
      e3.message = "Invalid date supplied: " + r2, n.config.errorHandler(e3);
    }
    t2 && n.currentYear !== i2 && (I2("onYearChange"), T()), t2 && (n.currentYear !== i2 || n.currentMonth !== a2) && I2("onMonthChange"), n.redraw();
  }
  function y(e2) {
    var t2 = J(e2);
    ~t2.className.indexOf("arrow") && b(e2, t2.classList.contains("arrowUp") ? 1 : -1);
  }
  function b(e2, t2, n2) {
    var r2 = e2 && J(e2), i2 = n2 || r2 && r2.parentNode && r2.parentNode.firstChild, a2 = Fe2("increment");
    a2.delta = t2, i2 && i2.dispatchEvent(a2);
  }
  function ee() {
    var e2 = window.document.createDocumentFragment();
    if (n.calendarContainer = q("div", "flatpickr-calendar"), n.calendarContainer.tabIndex = -1, !n.config.noCalendar) {
      if (e2.appendChild(oe()), n.innerContainer = q("div", "flatpickr-innerContainer"), n.config.weekNumbers) {
        var t2 = E2(), r2 = t2.weekWrapper, i2 = t2.weekNumbers;
        n.innerContainer.appendChild(r2), n.weekNumbers = i2, n.weekWrapper = r2;
      }
      n.rContainer = q("div", "flatpickr-rContainer"), n.rContainer.appendChild(ce()), n.daysContainer || (n.daysContainer = q("div", "flatpickr-days"), n.daysContainer.tabIndex = -1), re(), n.rContainer.appendChild(n.daysContainer), n.innerContainer.appendChild(n.rContainer), e2.appendChild(n.innerContainer);
    }
    n.config.enableTime && e2.appendChild(se()), K(n.calendarContainer, "rangeMode", n.config.mode === "range"), K(n.calendarContainer, "animate", n.config.animate === true), K(n.calendarContainer, "multiMonth", n.config.showMonths > 1), n.calendarContainer.appendChild(e2);
    var a2 = n.config.appendTo !== void 0 && n.config.appendTo.nodeType !== void 0;
    if ((n.config.inline || n.config.static) && (n.calendarContainer.classList.add(n.config.inline ? "inline" : "static"), n.config.inline && (!a2 && n.element.parentNode ? n.element.parentNode.insertBefore(n.calendarContainer, n._input.nextSibling) : n.config.appendTo !== void 0 && n.config.appendTo.appendChild(n.calendarContainer)), n.config.static)) {
      var o2 = q("div", "flatpickr-wrapper");
      n.element.parentNode && n.element.parentNode.insertBefore(o2, n.element), o2.appendChild(n.element), n.altInput && o2.appendChild(n.altInput), o2.appendChild(n.calendarContainer);
    }
    !n.config.static && !n.config.inline && (n.config.appendTo === void 0 ? window.document.body : n.config.appendTo).appendChild(n.calendarContainer);
  }
  function x(e2, t2, r2, i2) {
    var a2 = k2(t2, true), o2 = q("span", e2, t2.getDate().toString());
    return o2.dateObj = t2, o2.$i = i2, o2.setAttribute("aria-label", n.formatDate(t2, n.config.ariaDateFormat)), e2.indexOf("hidden") === -1 && X(t2, n.now) === 0 && (n.todayDateElem = o2, o2.classList.add("today"), o2.setAttribute("aria-current", "date")), a2 ? (o2.tabIndex = -1, L2(t2) && (o2.classList.add("selected"), n.selectedDateElem = o2, n.config.mode === "range" && (K(o2, "startRange", n.selectedDates[0] && X(t2, n.selectedDates[0], true) === 0), K(o2, "endRange", n.selectedDates[1] && X(t2, n.selectedDates[1], true) === 0), e2 === "nextMonthDay" && o2.classList.add("inRange")))) : o2.classList.add("flatpickr-disabled"), n.config.mode === "range" && R2(t2) && !L2(t2) && o2.classList.add("inRange"), n.weekNumbers && n.config.showMonths === 1 && e2 !== "prevMonthDay" && i2 % 7 == 6 && n.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + n.config.getWeek(t2) + "</span>"), I2("onDayCreate", o2), o2;
  }
  function S(e2) {
    e2.focus(), n.config.mode === "range" && ve2(e2);
  }
  function C(e2) {
    for (var t2 = e2 > 0 ? 0 : n.config.showMonths - 1, r2 = e2 > 0 ? n.config.showMonths : -1, i2 = t2; i2 != r2; i2 += e2) for (var a2 = n.daysContainer.children[i2], o2 = e2 > 0 ? 0 : a2.children.length - 1, s2 = e2 > 0 ? a2.children.length : -1, c2 = o2; c2 != s2; c2 += e2) {
      var l2 = a2.children[c2];
      if (l2.className.indexOf("hidden") === -1 && k2(l2.dateObj)) return l2;
    }
  }
  function te(e2, t2) {
    for (var r2 = e2.className.indexOf("Month") === -1 ? e2.dateObj.getMonth() : n.currentMonth, i2 = t2 > 0 ? n.config.showMonths : -1, a2 = t2 > 0 ? 1 : -1, o2 = r2 - n.currentMonth; o2 != i2; o2 += a2) for (var s2 = n.daysContainer.children[o2], c2 = r2 - n.currentMonth === o2 ? e2.$i + t2 : t2 < 0 ? s2.children.length - 1 : 0, l2 = s2.children.length, u2 = c2; u2 >= 0 && u2 < l2 && u2 != (t2 > 0 ? l2 : -1); u2 += a2) {
      var d2 = s2.children[u2];
      if (d2.className.indexOf("hidden") === -1 && k2(d2.dateObj) && Math.abs(e2.$i - u2) >= Math.abs(t2)) return S(d2);
    }
    n.changeMonth(a2), w(C(a2), 0);
  }
  function w(e2, t2) {
    var r2 = a(), i2 = he2(r2 || document.body), o2 = e2 === void 0 ? i2 ? r2 : n.selectedDateElem !== void 0 && he2(n.selectedDateElem) ? n.selectedDateElem : n.todayDateElem !== void 0 && he2(n.todayDateElem) ? n.todayDateElem : C(t2 > 0 ? 1 : -1) : e2;
    o2 === void 0 ? n._input.focus() : i2 ? te(o2, t2) : S(o2);
  }
  function ne(e2, t2) {
    for (var r2 = (new Date(e2, t2, 1).getDay() - n.l10n.firstDayOfWeek + 7) % 7, i2 = n.utils.getDaysInMonth((t2 - 1 + 12) % 12, e2), a2 = n.utils.getDaysInMonth(t2, e2), o2 = window.document.createDocumentFragment(), s2 = n.config.showMonths > 1, c2 = s2 ? "prevMonthDay hidden" : "prevMonthDay", l2 = s2 ? "nextMonthDay hidden" : "nextMonthDay", u2 = i2 + 1 - r2, d2 = 0; u2 <= i2; u2++, d2++) o2.appendChild(x("flatpickr-day " + c2, new Date(e2, t2 - 1, u2), u2, d2));
    for (u2 = 1; u2 <= a2; u2++, d2++) o2.appendChild(x("flatpickr-day", new Date(e2, t2, u2), u2, d2));
    for (var f2 = a2 + 1; f2 <= 42 - r2 && (n.config.showMonths === 1 || d2 % 7 != 0); f2++, d2++) o2.appendChild(x("flatpickr-day " + l2, new Date(e2, t2 + 1, f2 % a2), f2, d2));
    var p2 = q("div", "dayContainer");
    return p2.appendChild(o2), p2;
  }
  function re() {
    if (n.daysContainer !== void 0) {
      gt(n.daysContainer), n.weekNumbers && gt(n.weekNumbers);
      for (var e2 = document.createDocumentFragment(), t2 = 0; t2 < n.config.showMonths; t2++) {
        var r2 = new Date(n.currentYear, n.currentMonth, 1);
        r2.setMonth(n.currentMonth + t2), e2.appendChild(ne(r2.getFullYear(), r2.getMonth()));
      }
      n.daysContainer.appendChild(e2), n.days = n.daysContainer.firstChild, n.config.mode === "range" && n.selectedDates.length === 1 && ve2();
    }
  }
  function T() {
    if (!(n.config.showMonths > 1 || n.config.monthSelectorType !== "dropdown")) {
      var e2 = function(e3) {
        return n.config.minDate !== void 0 && n.currentYear === n.config.minDate.getFullYear() && e3 < n.config.minDate.getMonth() ? false : !(n.config.maxDate !== void 0 && n.currentYear === n.config.maxDate.getFullYear() && e3 > n.config.maxDate.getMonth());
      };
      n.monthsDropdownContainer.tabIndex = -1, n.monthsDropdownContainer.innerHTML = "";
      for (var t2 = 0; t2 < 12; t2++) if (e2(t2)) {
        var r2 = q("option", "flatpickr-monthDropdown-month");
        r2.value = new Date(n.currentYear, t2).getMonth().toString(), r2.textContent = bt(t2, n.config.shorthandCurrentMonth, n.l10n), r2.tabIndex = -1, n.currentMonth === t2 && (r2.selected = true), n.monthsDropdownContainer.appendChild(r2);
      }
    }
  }
  function ie() {
    var e2 = q("div", "flatpickr-month"), t2 = window.document.createDocumentFragment(), r2;
    n.config.showMonths > 1 || n.config.monthSelectorType === "static" ? r2 = q("span", "cur-month") : (n.monthsDropdownContainer = q("select", "flatpickr-monthDropdown-months"), n.monthsDropdownContainer.setAttribute("aria-label", n.l10n.monthAriaLabel), h2(n.monthsDropdownContainer, "change", function(e3) {
      var t3 = J(e3), r3 = parseInt(t3.value, 10);
      n.changeMonth(r3 - n.currentMonth), I2("onMonthChange");
    }), T(), r2 = n.monthsDropdownContainer);
    var i2 = vt("cur-year", { tabindex: "-1" }), a2 = i2.getElementsByTagName("input")[0];
    a2.setAttribute("aria-label", n.l10n.yearAriaLabel), n.config.minDate && a2.setAttribute("min", n.config.minDate.getFullYear().toString()), n.config.maxDate && (a2.setAttribute("max", n.config.maxDate.getFullYear().toString()), a2.disabled = !!n.config.minDate && n.config.minDate.getFullYear() === n.config.maxDate.getFullYear());
    var o2 = q("div", "flatpickr-current-month");
    return o2.appendChild(r2), o2.appendChild(i2), t2.appendChild(o2), e2.appendChild(t2), {
      container: e2,
      yearElement: a2,
      monthElement: r2
    };
  }
  function ae() {
    gt(n.monthNav), n.monthNav.appendChild(n.prevMonthNav), n.config.showMonths && (n.yearElements = [], n.monthElements = []);
    for (var e2 = n.config.showMonths; e2--; ) {
      var t2 = ie();
      n.yearElements.push(t2.yearElement), n.monthElements.push(t2.monthElement), n.monthNav.appendChild(t2.container);
    }
    n.monthNav.appendChild(n.nextMonthNav);
  }
  function oe() {
    return n.monthNav = q("div", "flatpickr-months"), n.yearElements = [], n.monthElements = [], n.prevMonthNav = q("span", "flatpickr-prev-month"), n.prevMonthNav.innerHTML = n.config.prevArrow, n.nextMonthNav = q("span", "flatpickr-next-month"), n.nextMonthNav.innerHTML = n.config.nextArrow, ae(), Object.defineProperty(n, "_hidePrevMonthArrow", {
      get: function() {
        return n.__hidePrevMonthArrow;
      },
      set: function(e2) {
        n.__hidePrevMonthArrow !== e2 && (K(n.prevMonthNav, "flatpickr-disabled", e2), n.__hidePrevMonthArrow = e2);
      }
    }), Object.defineProperty(n, "_hideNextMonthArrow", {
      get: function() {
        return n.__hideNextMonthArrow;
      },
      set: function(e2) {
        n.__hideNextMonthArrow !== e2 && (K(n.nextMonthNav, "flatpickr-disabled", e2), n.__hideNextMonthArrow = e2);
      }
    }), n.currentYearElement = n.yearElements[0], z2(), n.monthNav;
  }
  function se() {
    n.calendarContainer.classList.add("hasTime"), n.config.noCalendar && n.calendarContainer.classList.add("noCalendar");
    var e2 = kt(n.config);
    n.timeContainer = q("div", "flatpickr-time"), n.timeContainer.tabIndex = -1;
    var t2 = q("span", "flatpickr-time-separator", ":"), r2 = vt("flatpickr-hour", { "aria-label": n.l10n.hourAriaLabel });
    n.hourElement = r2.getElementsByTagName("input")[0];
    var i2 = vt("flatpickr-minute", { "aria-label": n.l10n.minuteAriaLabel });
    if (n.minuteElement = i2.getElementsByTagName("input")[0], n.hourElement.tabIndex = n.minuteElement.tabIndex = -1, n.hourElement.value = W(n.latestSelectedDateObj ? n.latestSelectedDateObj.getHours() : n.config.time_24hr ? e2.hours : u(e2.hours)), n.minuteElement.value = W(n.latestSelectedDateObj ? n.latestSelectedDateObj.getMinutes() : e2.minutes), n.hourElement.setAttribute("step", n.config.hourIncrement.toString()), n.minuteElement.setAttribute("step", n.config.minuteIncrement.toString()), n.hourElement.setAttribute("min", n.config.time_24hr ? "0" : "1"), n.hourElement.setAttribute("max", n.config.time_24hr ? "23" : "12"), n.hourElement.setAttribute("maxlength", "2"), n.minuteElement.setAttribute("min", "0"), n.minuteElement.setAttribute("max", "59"), n.minuteElement.setAttribute("maxlength", "2"), n.timeContainer.appendChild(r2), n.timeContainer.appendChild(t2), n.timeContainer.appendChild(i2), n.config.time_24hr && n.timeContainer.classList.add("time24hr"), n.config.enableSeconds) {
      n.timeContainer.classList.add("hasSeconds");
      var a2 = vt("flatpickr-second");
      n.secondElement = a2.getElementsByTagName("input")[0], n.secondElement.value = W(n.latestSelectedDateObj ? n.latestSelectedDateObj.getSeconds() : e2.seconds), n.secondElement.setAttribute("step", n.minuteElement.getAttribute("step")), n.secondElement.setAttribute("min", "0"), n.secondElement.setAttribute("max", "59"), n.secondElement.setAttribute("maxlength", "2"), n.timeContainer.appendChild(q("span", "flatpickr-time-separator", ":")), n.timeContainer.appendChild(a2);
    }
    return n.config.time_24hr || (n.amPM = q("span", "flatpickr-am-pm", n.l10n.amPM[G((n.latestSelectedDateObj ? n.hourElement.value : n.config.defaultHour) > 11)]), n.amPM.title = n.l10n.toggleTitle, n.amPM.tabIndex = -1, n.timeContainer.appendChild(n.amPM)), n.timeContainer;
  }
  function ce() {
    n.weekdayContainer ? gt(n.weekdayContainer) : n.weekdayContainer = q("div", "flatpickr-weekdays");
    for (var e2 = n.config.showMonths; e2--; ) {
      var t2 = q("div", "flatpickr-weekdaycontainer");
      n.weekdayContainer.appendChild(t2);
    }
    return le2(), n.weekdayContainer;
  }
  function le2() {
    if (n.weekdayContainer) {
      var e2 = n.l10n.firstDayOfWeek, t2 = At(n.l10n.weekdays.shorthand);
      e2 > 0 && e2 < t2.length && (t2 = At(t2.splice(e2, t2.length), t2.splice(0, e2)));
      for (var r2 = n.config.showMonths; r2--; ) n.weekdayContainer.children[r2].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + t2.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
    }
  }
  function E2() {
    n.calendarContainer.classList.add("hasWeeks");
    var e2 = q("div", "flatpickr-weekwrapper");
    e2.appendChild(q("span", "flatpickr-weekday", n.l10n.weekAbbreviation));
    var t2 = q("div", "flatpickr-weeks");
    return e2.appendChild(t2), {
      weekWrapper: e2,
      weekNumbers: t2
    };
  }
  function ue2(e2, t2) {
    t2 === void 0 && (t2 = true);
    var r2 = t2 ? e2 : e2 - n.currentMonth;
    r2 < 0 && n._hidePrevMonthArrow === true || r2 > 0 && n._hideNextMonthArrow === true || (n.currentMonth += r2, (n.currentMonth < 0 || n.currentMonth > 11) && (n.currentYear += n.currentMonth > 11 ? 1 : -1, n.currentMonth = (n.currentMonth + 12) % 12, I2("onYearChange"), T()), re(), I2("onMonthChange"), z2());
  }
  function de2(e2, t2) {
    if (e2 === void 0 && (e2 = true), t2 === void 0 && (t2 = true), n.input.value = "", n.altInput !== void 0 && (n.altInput.value = ""), n.mobileInput !== void 0 && (n.mobileInput.value = ""), n.selectedDates = [], n.latestSelectedDateObj = void 0, t2 === true && (n.currentYear = n._initialDate.getFullYear(), n.currentMonth = n._initialDate.getMonth()), n.config.enableTime === true) {
      var r2 = kt(n.config), i2 = r2.hours, a2 = r2.minutes, o2 = r2.seconds;
      p(i2, a2, o2);
    }
    n.redraw(), e2 && I2("onChange");
  }
  function D2() {
    n.isOpen = false, n.isMobile || (n.calendarContainer !== void 0 && n.calendarContainer.classList.remove("open"), n._input !== void 0 && n._input.classList.remove("active")), I2("onClose");
  }
  function fe2() {
    n.config !== void 0 && I2("onDestroy");
    for (var e2 = n._handlers.length; e2--; ) n._handlers[e2].remove();
    if (n._handlers = [], n.mobileInput) n.mobileInput.parentNode && n.mobileInput.parentNode.removeChild(n.mobileInput), n.mobileInput = void 0;
    else if (n.calendarContainer && n.calendarContainer.parentNode) if (n.config.static && n.calendarContainer.parentNode) {
      var t2 = n.calendarContainer.parentNode;
      if (t2.lastChild && t2.removeChild(t2.lastChild), t2.parentNode) {
        for (; t2.firstChild; ) t2.parentNode.insertBefore(t2.firstChild, t2);
        t2.parentNode.removeChild(t2);
      }
    } else n.calendarContainer.parentNode.removeChild(n.calendarContainer);
    n.altInput && (n.input.type = "text", n.altInput.parentNode && n.altInput.parentNode.removeChild(n.altInput), delete n.altInput), n.input && (n.input.type = n.input._type, n.input.classList.remove("flatpickr-input"), n.input.removeAttribute("readonly")), "_showTimeInput.latestSelectedDateObj._hideNextMonthArrow._hidePrevMonthArrow.__hideNextMonthArrow.__hidePrevMonthArrow.isMobile.isOpen.selectedDateElem.minDateHasTime.maxDateHasTime.days.daysContainer._input._positionElement.innerContainer.rContainer.monthNav.todayDateElem.calendarContainer.weekdayContainer.prevMonthNav.nextMonthNav.monthsDropdownContainer.currentMonthElement.currentYearElement.navigationCurrentMonth.selectedDateElem.config".split(".").forEach(function(e3) {
      try {
        delete n[e3];
      } catch {
      }
    });
  }
  function O2(e2) {
    return n.calendarContainer.contains(e2);
  }
  function pe2(e2) {
    if (n.isOpen && !n.config.inline) {
      var t2 = J(e2), r2 = O2(t2), i2 = !(t2 === n.input || t2 === n.altInput || n.element.contains(t2) || e2.path && e2.path.indexOf && (~e2.path.indexOf(n.input) || ~e2.path.indexOf(n.altInput))) && !r2 && !O2(e2.relatedTarget), a2 = !n.config.ignoredFocusElements.some(function(e3) {
        return e3.contains(t2);
      });
      i2 && a2 && (n.config.allowInput && n.setDate(n._input.value, false, n.config.altInput ? n.config.altFormat : n.config.dateFormat), n.timeContainer !== void 0 && n.minuteElement !== void 0 && n.hourElement !== void 0 && n.input.value !== "" && n.input.value !== void 0 && c(), n.close(), n.config && n.config.mode === "range" && n.selectedDates.length === 1 && n.clear(false));
    }
  }
  function me2(e2) {
    if (!(!e2 || n.config.minDate && e2 < n.config.minDate.getFullYear() || n.config.maxDate && e2 > n.config.maxDate.getFullYear())) {
      var t2 = e2, r2 = n.currentYear !== t2;
      n.currentYear = t2 || n.currentYear, n.config.maxDate && n.currentYear === n.config.maxDate.getFullYear() ? n.currentMonth = Math.min(n.config.maxDate.getMonth(), n.currentMonth) : n.config.minDate && n.currentYear === n.config.minDate.getFullYear() && (n.currentMonth = Math.max(n.config.minDate.getMonth(), n.currentMonth)), r2 && (n.redraw(), I2("onYearChange"), T());
    }
  }
  function k2(e2, t2) {
    t2 === void 0 && (t2 = true);
    var r2 = n.parseDate(e2, void 0, t2);
    if (n.config.minDate && r2 && X(r2, n.config.minDate, t2 === void 0 ? !n.minDateHasTime : t2) < 0 || n.config.maxDate && r2 && X(r2, n.config.maxDate, t2 === void 0 ? !n.maxDateHasTime : t2) > 0) return false;
    if (!n.config.enable && n.config.disable.length === 0) return true;
    if (r2 === void 0) return false;
    for (var i2 = !!n.config.enable, a2 = n.config.enable ?? n.config.disable, o2 = 0, s2 = void 0; o2 < a2.length; o2++) {
      if (s2 = a2[o2], typeof s2 == "function" && s2(r2) || s2 instanceof Date && r2 !== void 0 && s2.getTime() === r2.getTime()) return i2;
      if (typeof s2 == "string") {
        var c2 = n.parseDate(s2, void 0, true);
        return c2 && c2.getTime() === r2.getTime() ? i2 : !i2;
      } else if (typeof s2 == "object" && r2 !== void 0 && s2.from && s2.to && r2.getTime() >= s2.from.getTime() && r2.getTime() <= s2.to.getTime()) return i2;
    }
    return !i2;
  }
  function he2(e2) {
    return n.daysContainer === void 0 ? false : e2.className.indexOf("hidden") === -1 && e2.className.indexOf("flatpickr-disabled") === -1 && n.daysContainer.contains(e2);
  }
  function ge2(e2) {
    var t2 = e2.target === n._input, r2 = n._input.value.trimEnd() !== Ie2();
    t2 && r2 && !(e2.relatedTarget && O2(e2.relatedTarget)) && n.setDate(n._input.value, true, e2.target === n.altInput ? n.config.altFormat : n.config.dateFormat);
  }
  function _e2(t2) {
    var r2 = J(t2), i2 = n.config.wrap ? e.contains(r2) : r2 === n._input, o2 = n.config.allowInput, s2 = n.isOpen && (!o2 || !i2), l2 = n.config.inline && i2 && !o2;
    if (t2.keyCode === 13 && i2) {
      if (o2) return n.setDate(n._input.value, true, r2 === n.altInput ? n.config.altFormat : n.config.dateFormat), n.close(), r2.blur();
      n.open();
    } else if (O2(r2) || s2 || l2) {
      var u2 = !!n.timeContainer && n.timeContainer.contains(r2);
      switch (t2.keyCode) {
        case 13:
          u2 ? (t2.preventDefault(), c(), j2()) : M2(t2);
          break;
        case 27:
          t2.preventDefault(), j2();
          break;
        case 8:
        case 46:
          i2 && !n.config.allowInput && (t2.preventDefault(), n.clear());
          break;
        case 37:
        case 39:
          if (!u2 && !i2) {
            t2.preventDefault();
            var f2 = a();
            if (n.daysContainer !== void 0 && (o2 === false || f2 && he2(f2))) {
              var p2 = t2.keyCode === 39 ? 1 : -1;
              t2.ctrlKey ? (t2.stopPropagation(), ue2(p2), w(C(1), 0)) : w(void 0, p2);
            }
          } else n.hourElement && n.hourElement.focus();
          break;
        case 38:
        case 40:
          t2.preventDefault();
          var m2 = t2.keyCode === 40 ? 1 : -1;
          n.daysContainer && r2.$i !== void 0 || r2 === n.input || r2 === n.altInput ? t2.ctrlKey ? (t2.stopPropagation(), me2(n.currentYear - m2), w(C(1), 0)) : u2 || w(void 0, m2 * 7) : r2 === n.currentYearElement ? me2(n.currentYear - m2) : n.config.enableTime && (!u2 && n.hourElement && n.hourElement.focus(), c(t2), n._debouncedChange());
          break;
        case 9:
          if (u2) {
            var h3 = [
              n.hourElement,
              n.minuteElement,
              n.secondElement,
              n.amPM
            ].concat(n.pluginElements).filter(function(e2) {
              return e2;
            }), g2 = h3.indexOf(r2);
            if (g2 !== -1) {
              var _2 = h3[g2 + (t2.shiftKey ? -1 : 1)];
              t2.preventDefault(), (_2 || n._input).focus();
            }
          } else !n.config.noCalendar && n.daysContainer && n.daysContainer.contains(r2) && t2.shiftKey && (t2.preventDefault(), n._input.focus());
          break;
        default:
          break;
      }
    }
    if (n.amPM !== void 0 && r2 === n.amPM) switch (t2.key) {
      case n.l10n.amPM[0].charAt(0):
      case n.l10n.amPM[0].charAt(0).toLowerCase():
        n.amPM.textContent = n.l10n.amPM[0], d(), B2();
        break;
      case n.l10n.amPM[1].charAt(0):
      case n.l10n.amPM[1].charAt(0).toLowerCase():
        n.amPM.textContent = n.l10n.amPM[1], d(), B2();
        break;
    }
    (i2 || O2(r2)) && I2("onKeyDown", t2);
  }
  function ve2(e2, t2) {
    if (t2 === void 0 && (t2 = "flatpickr-day"), !(n.selectedDates.length !== 1 || e2 && (!e2.classList.contains(t2) || e2.classList.contains("flatpickr-disabled")))) {
      for (var r2 = e2 ? e2.dateObj.getTime() : n.days.firstElementChild.dateObj.getTime(), i2 = n.parseDate(n.selectedDates[0], void 0, true).getTime(), a2 = Math.min(r2, n.selectedDates[0].getTime()), o2 = Math.max(r2, n.selectedDates[0].getTime()), s2 = false, c2 = 0, l2 = 0, u2 = a2; u2 < o2; u2 += Ot.DAY) k2(new Date(u2), true) || (s2 || (s2 = u2 > a2 && u2 < o2), u2 < i2 && (!c2 || u2 > c2) ? c2 = u2 : u2 > i2 && (!l2 || u2 < l2) && (l2 = u2));
      Array.from(n.rContainer.querySelectorAll("*:nth-child(-n+" + n.config.showMonths + ") > ." + t2)).forEach(function(t3) {
        var a3 = t3.dateObj.getTime(), o3 = c2 > 0 && a3 < c2 || l2 > 0 && a3 > l2;
        if (o3) {
          t3.classList.add("notAllowed"), [
            "inRange",
            "startRange",
            "endRange"
          ].forEach(function(e3) {
            t3.classList.remove(e3);
          });
          return;
        } else if (s2 && !o3) return;
        [
          "startRange",
          "inRange",
          "endRange",
          "notAllowed"
        ].forEach(function(e3) {
          t3.classList.remove(e3);
        }), e2 !== void 0 && (e2.classList.add(r2 <= n.selectedDates[0].getTime() ? "startRange" : "endRange"), i2 < r2 && a3 === i2 ? t3.classList.add("startRange") : i2 > r2 && a3 === i2 && t3.classList.add("endRange"), a3 >= c2 && (l2 === 0 || a3 <= l2) && Tt(a3, i2, r2) && t3.classList.add("inRange"));
      });
    }
  }
  function ye2() {
    n.isOpen && !n.config.static && !n.config.inline && we2();
  }
  function be2(e2, t2) {
    if (t2 === void 0 && (t2 = n._positionElement), n.isMobile === true) {
      if (e2) {
        e2.preventDefault();
        var r2 = J(e2);
        r2 && r2.blur();
      }
      n.mobileInput !== void 0 && (n.mobileInput.focus(), n.mobileInput.click()), I2("onOpen");
      return;
    } else if (n._input.disabled || n.config.inline) return;
    var i2 = n.isOpen;
    n.isOpen = true, i2 || (n.calendarContainer.classList.add("open"), n._input.classList.add("active"), I2("onOpen"), we2(t2)), n.config.enableTime === true && n.config.noCalendar === true && n.config.allowInput === false && (e2 === void 0 || !n.timeContainer.contains(e2.relatedTarget)) && setTimeout(function() {
      return n.hourElement.select();
    }, 50);
  }
  function xe2(e2) {
    return function(t2) {
      var r2 = n.config["_" + e2 + "Date"] = n.parseDate(t2, n.config.dateFormat), i2 = n.config["_" + (e2 === "min" ? "max" : "min") + "Date"];
      r2 !== void 0 && (n[e2 === "min" ? "minDateHasTime" : "maxDateHasTime"] = r2.getHours() > 0 || r2.getMinutes() > 0 || r2.getSeconds() > 0), n.selectedDates && (n.selectedDates = n.selectedDates.filter(function(e3) {
        return k2(e3);
      }), !n.selectedDates.length && e2 === "min" && f(r2), B2()), n.daysContainer && (De2(), r2 === void 0 ? n.currentYearElement.removeAttribute(e2) : n.currentYearElement[e2] = r2.getFullYear().toString(), n.currentYearElement.disabled = !!i2 && r2 !== void 0 && i2.getFullYear() === r2.getFullYear());
    };
  }
  function Se2() {
    var r2 = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ], i2 = Z(Z({}, JSON.parse(JSON.stringify(e.dataset || {}))), t), a2 = {};
    n.config.parseDate = i2.parseDate, n.config.formatDate = i2.formatDate, Object.defineProperty(n.config, "enable", {
      get: function() {
        return n.config._enable;
      },
      set: function(e2) {
        n.config._enable = ke2(e2);
      }
    }), Object.defineProperty(n.config, "disable", {
      get: function() {
        return n.config._disable;
      },
      set: function(e2) {
        n.config._disable = ke2(e2);
      }
    });
    var s2 = i2.mode === "time";
    if (!i2.dateFormat && (i2.enableTime || s2)) {
      var c2 = Q.defaultConfig.dateFormat || ft.dateFormat;
      a2.dateFormat = i2.noCalendar || s2 ? "H:i" + (i2.enableSeconds ? ":S" : "") : c2 + " H:i" + (i2.enableSeconds ? ":S" : "");
    }
    if (i2.altInput && (i2.enableTime || s2) && !i2.altFormat) {
      var l2 = Q.defaultConfig.altFormat || ft.altFormat;
      a2.altFormat = i2.noCalendar || s2 ? "h:i" + (i2.enableSeconds ? ":S K" : " K") : l2 + (" h:i" + (i2.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(n.config, "minDate", {
      get: function() {
        return n.config._minDate;
      },
      set: xe2("min")
    }), Object.defineProperty(n.config, "maxDate", {
      get: function() {
        return n.config._maxDate;
      },
      set: xe2("max")
    });
    var u2 = function(e2) {
      return function(t2) {
        n.config[e2 === "min" ? "_minTime" : "_maxTime"] = n.parseDate(t2, "H:i:S");
      };
    };
    Object.defineProperty(n.config, "minTime", {
      get: function() {
        return n.config._minTime;
      },
      set: u2("min")
    }), Object.defineProperty(n.config, "maxTime", {
      get: function() {
        return n.config._maxTime;
      },
      set: u2("max")
    }), i2.mode === "time" && (n.config.noCalendar = true, n.config.enableTime = true), Object.assign(n.config, a2, i2);
    for (var d2 = 0; d2 < r2.length; d2++) n.config[r2[d2]] = n.config[r2[d2]] === true || n.config[r2[d2]] === "true";
    dt.filter(function(e2) {
      return n.config[e2] !== void 0;
    }).forEach(function(e2) {
      n.config[e2] = ht(n.config[e2] || []).map(o);
    }), n.isMobile = !n.config.disableMobile && !n.config.inline && n.config.mode === "single" && !n.config.disable.length && !n.config.enable && !n.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var d2 = 0; d2 < n.config.plugins.length; d2++) {
      var f2 = n.config.plugins[d2](n) || {};
      for (var p2 in f2) dt.indexOf(p2) > -1 ? n.config[p2] = ht(f2[p2]).map(o).concat(n.config[p2]) : i2[p2] === void 0 && (n.config[p2] = f2[p2]);
    }
    i2.altInputClass || (n.config.altInputClass = A2().className + " " + n.config.altInputClass), I2("onParseConfig");
  }
  function A2() {
    return n.config.wrap ? e.querySelector("[data-input]") : e;
  }
  function Ce2() {
    typeof n.config.locale != "object" && Q.l10ns[n.config.locale] === void 0 && n.config.errorHandler(Error("flatpickr: invalid locale " + n.config.locale)), n.l10n = Z(Z({}, Q.l10ns.default), typeof n.config.locale == "object" ? n.config.locale : n.config.locale === "default" ? void 0 : Q.l10ns[n.config.locale]), Y.D = "(" + n.l10n.weekdays.shorthand.join("|") + ")", Y.l = "(" + n.l10n.weekdays.longhand.join("|") + ")", Y.M = "(" + n.l10n.months.shorthand.join("|") + ")", Y.F = "(" + n.l10n.months.longhand.join("|") + ")", Y.K = "(" + n.l10n.amPM[0] + "|" + n.l10n.amPM[1] + "|" + n.l10n.amPM[0].toLowerCase() + "|" + n.l10n.amPM[1].toLowerCase() + ")", Z(Z({}, t), JSON.parse(JSON.stringify(e.dataset || {}))).time_24hr === void 0 && Q.defaultConfig.time_24hr === void 0 && (n.config.time_24hr = n.l10n.time_24hr), n.formatDate = Ct(n), n.parseDate = wt({
      config: n.config,
      l10n: n.l10n
    });
  }
  function we2(e2) {
    if (typeof n.config.position == "function") {
      n.config.position(n, e2);
      return;
    }
    if (n.calendarContainer !== void 0) {
      I2("onPreCalendarPosition");
      var t2 = e2 || n._positionElement, r2 = Array.prototype.reduce.call(n.calendarContainer.children, function(e3, t3) {
        return e3 + t3.offsetHeight;
      }, 0), i2 = n.calendarContainer.offsetWidth, a2 = n.config.position.split(" "), o2 = a2[0], s2 = a2.length > 1 ? a2[1] : null, c2 = t2.getBoundingClientRect(), l2 = window.innerHeight - c2.bottom, u2 = o2 === "above" || o2 !== "below" && l2 < r2 && c2.top > r2, d2 = window.pageYOffset + c2.top + (u2 ? -r2 - 2 : t2.offsetHeight + 2);
      if (K(n.calendarContainer, "arrowTop", !u2), K(n.calendarContainer, "arrowBottom", u2), !n.config.inline) {
        var f2 = window.pageXOffset + c2.left, p2 = false, m2 = false;
        s2 === "center" ? (f2 -= (i2 - c2.width) / 2, p2 = true) : s2 === "right" && (f2 -= i2 - c2.width, m2 = true), K(n.calendarContainer, "arrowLeft", !p2 && !m2), K(n.calendarContainer, "arrowCenter", p2), K(n.calendarContainer, "arrowRight", m2);
        var h3 = window.document.body.offsetWidth - (window.pageXOffset + c2.right), g2 = f2 + i2 > window.document.body.offsetWidth, _2 = h3 + i2 > window.document.body.offsetWidth;
        if (K(n.calendarContainer, "rightMost", g2), !n.config.static) if (n.calendarContainer.style.top = d2 + "px", !g2) n.calendarContainer.style.left = f2 + "px", n.calendarContainer.style.right = "auto";
        else if (!_2) n.calendarContainer.style.left = "auto", n.calendarContainer.style.right = h3 + "px";
        else {
          var v2 = Te2();
          if (v2 === void 0) return;
          var y2 = window.document.body.offsetWidth, b2 = Math.max(0, y2 / 2 - i2 / 2), ee2 = ".flatpickr-calendar.centerMost:before", x2 = ".flatpickr-calendar.centerMost:after", S2 = v2.cssRules.length, C2 = "{left:" + c2.left + "px;right:auto;}";
          K(n.calendarContainer, "rightMost", false), K(n.calendarContainer, "centerMost", true), v2.insertRule(ee2 + "," + x2 + C2, S2), n.calendarContainer.style.left = b2 + "px", n.calendarContainer.style.right = "auto";
        }
      }
    }
  }
  function Te2() {
    for (var e2 = null, t2 = 0; t2 < document.styleSheets.length; t2++) {
      var n2 = document.styleSheets[t2];
      if (n2.cssRules) {
        try {
          n2.cssRules;
        } catch {
          continue;
        }
        e2 = n2;
        break;
      }
    }
    return e2 ?? Ee2();
  }
  function Ee2() {
    var e2 = document.createElement("style");
    return document.head.appendChild(e2), e2.sheet;
  }
  function De2() {
    n.config.noCalendar || n.isMobile || (T(), z2(), re());
  }
  function j2() {
    n._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(n.close, 0) : n.close();
  }
  function M2(e2) {
    e2.preventDefault(), e2.stopPropagation();
    var t2 = _t(J(e2), function(e3) {
      return e3.classList && e3.classList.contains("flatpickr-day") && !e3.classList.contains("flatpickr-disabled") && !e3.classList.contains("notAllowed");
    });
    if (t2 !== void 0) {
      var r2 = t2, i2 = n.latestSelectedDateObj = new Date(r2.dateObj.getTime()), a2 = (i2.getMonth() < n.currentMonth || i2.getMonth() > n.currentMonth + n.config.showMonths - 1) && n.config.mode !== "range";
      if (n.selectedDateElem = r2, n.config.mode === "single") n.selectedDates = [i2];
      else if (n.config.mode === "multiple") {
        var o2 = L2(i2);
        o2 ? n.selectedDates.splice(parseInt(o2), 1) : n.selectedDates.push(i2);
      } else n.config.mode === "range" && (n.selectedDates.length === 2 && n.clear(false, false), n.latestSelectedDateObj = i2, n.selectedDates.push(i2), X(i2, n.selectedDates[0], true) !== 0 && n.selectedDates.sort(function(e3, t3) {
        return e3.getTime() - t3.getTime();
      }));
      if (d(), a2) {
        var s2 = n.currentYear !== i2.getFullYear();
        n.currentYear = i2.getFullYear(), n.currentMonth = i2.getMonth(), s2 && (I2("onYearChange"), T()), I2("onMonthChange");
      }
      if (z2(), re(), B2(), !a2 && n.config.mode !== "range" && n.config.showMonths === 1 ? S(r2) : n.selectedDateElem !== void 0 && n.hourElement === void 0 && n.selectedDateElem && n.selectedDateElem.focus(), n.hourElement !== void 0 && n.hourElement !== void 0 && n.hourElement.focus(), n.config.closeOnSelect) {
        var c2 = n.config.mode === "single" && !n.config.enableTime, l2 = n.config.mode === "range" && n.selectedDates.length === 2 && !n.config.enableTime;
        (c2 || l2) && j2();
      }
      g();
    }
  }
  var N2 = {
    locale: [Ce2, le2],
    showMonths: [
      ae,
      s,
      ce
    ],
    minDate: [v],
    maxDate: [v],
    positionElement: [Me2],
    clickOpens: [function() {
      n.config.clickOpens === true ? (h2(n._input, "focus", n.open), h2(n._input, "click", n.open)) : (n._input.removeEventListener("focus", n.open), n._input.removeEventListener("click", n.open));
    }]
  };
  function P2(e2, t2) {
    if (typeof e2 == "object" && e2) for (var r2 in Object.assign(n.config, e2), e2) N2[r2] !== void 0 && N2[r2].forEach(function(e3) {
      return e3();
    });
    else n.config[e2] = t2, N2[e2] === void 0 ? dt.indexOf(e2) > -1 && (n.config[e2] = ht(t2)) : N2[e2].forEach(function(e3) {
      return e3();
    });
    n.redraw(), B2(true);
  }
  function Oe2(e2, t2) {
    var r2 = [];
    if (e2 instanceof Array) r2 = e2.map(function(e3) {
      return n.parseDate(e3, t2);
    });
    else if (e2 instanceof Date || typeof e2 == "number") r2 = [n.parseDate(e2, t2)];
    else if (typeof e2 == "string") switch (n.config.mode) {
      case "single":
      case "time":
        r2 = [n.parseDate(e2, t2)];
        break;
      case "multiple":
        r2 = e2.split(n.config.conjunction).map(function(e3) {
          return n.parseDate(e3, t2);
        });
        break;
      case "range":
        r2 = e2.split(n.l10n.rangeSeparator).map(function(e3) {
          return n.parseDate(e3, t2);
        });
        break;
      default:
        break;
    }
    else n.config.errorHandler(Error("Invalid date supplied: " + JSON.stringify(e2)));
    n.selectedDates = n.config.allowInvalidPreload ? r2 : r2.filter(function(e3) {
      return e3 instanceof Date && k2(e3, false);
    }), n.config.mode === "range" && n.selectedDates.sort(function(e3, t3) {
      return e3.getTime() - t3.getTime();
    });
  }
  function F2(e2, t2, r2) {
    if (t2 === void 0 && (t2 = false), r2 === void 0 && (r2 = n.config.dateFormat), e2 !== 0 && !e2 || e2 instanceof Array && e2.length === 0) return n.clear(t2);
    Oe2(e2, r2), n.latestSelectedDateObj = n.selectedDates[n.selectedDates.length - 1], n.redraw(), v(void 0, t2), f(), n.selectedDates.length === 0 && n.clear(false), B2(t2), t2 && I2("onChange");
  }
  function ke2(e2) {
    return e2.slice().map(function(e3) {
      return typeof e3 == "string" || typeof e3 == "number" || e3 instanceof Date ? n.parseDate(e3, void 0, true) : e3 && typeof e3 == "object" && e3.from && e3.to ? {
        from: n.parseDate(e3.from, void 0),
        to: n.parseDate(e3.to, void 0)
      } : e3;
    }).filter(function(e3) {
      return e3;
    });
  }
  function Ae2() {
    n.selectedDates = [], n.now = n.parseDate(n.config.now) || /* @__PURE__ */ new Date();
    var e2 = n.config.defaultDate || ((n.input.nodeName === "INPUT" || n.input.nodeName === "TEXTAREA") && n.input.placeholder && n.input.value === n.input.placeholder ? null : n.input.value);
    e2 && Oe2(e2, n.config.dateFormat), n._initialDate = n.selectedDates.length > 0 ? n.selectedDates[0] : n.config.minDate && n.config.minDate.getTime() > n.now.getTime() ? n.config.minDate : n.config.maxDate && n.config.maxDate.getTime() < n.now.getTime() ? n.config.maxDate : n.now, n.currentYear = n._initialDate.getFullYear(), n.currentMonth = n._initialDate.getMonth(), n.selectedDates.length > 0 && (n.latestSelectedDateObj = n.selectedDates[0]), n.config.minTime !== void 0 && (n.config.minTime = n.parseDate(n.config.minTime, "H:i")), n.config.maxTime !== void 0 && (n.config.maxTime = n.parseDate(n.config.maxTime, "H:i")), n.minDateHasTime = !!n.config.minDate && (n.config.minDate.getHours() > 0 || n.config.minDate.getMinutes() > 0 || n.config.minDate.getSeconds() > 0), n.maxDateHasTime = !!n.config.maxDate && (n.config.maxDate.getHours() > 0 || n.config.maxDate.getMinutes() > 0 || n.config.maxDate.getSeconds() > 0);
  }
  function je2() {
    if (n.input = A2(), !n.input) {
      n.config.errorHandler(Error("Invalid input element specified"));
      return;
    }
    n.input._type = n.input.type, n.input.type = "text", n.input.classList.add("flatpickr-input"), n._input = n.input, n.config.altInput && (n.altInput = q(n.input.nodeName, n.config.altInputClass), n._input = n.altInput, n.altInput.placeholder = n.input.placeholder, n.altInput.disabled = n.input.disabled, n.altInput.required = n.input.required, n.altInput.tabIndex = n.input.tabIndex, n.altInput.type = "text", n.input.setAttribute("type", "hidden"), !n.config.static && n.input.parentNode && n.input.parentNode.insertBefore(n.altInput, n.input.nextSibling)), n.config.allowInput || n._input.setAttribute("readonly", "readonly"), Me2();
  }
  function Me2() {
    n._positionElement = n.config.positionElement || n._input;
  }
  function Ne2() {
    var e2 = n.config.enableTime ? n.config.noCalendar ? "time" : "datetime-local" : "date";
    n.mobileInput = q("input", n.input.className + " flatpickr-mobile"), n.mobileInput.tabIndex = 1, n.mobileInput.type = e2, n.mobileInput.disabled = n.input.disabled, n.mobileInput.required = n.input.required, n.mobileInput.placeholder = n.input.placeholder, n.mobileFormatStr = e2 === "datetime-local" ? "Y-m-d\\TH:i:S" : e2 === "date" ? "Y-m-d" : "H:i:S", n.selectedDates.length > 0 && (n.mobileInput.defaultValue = n.mobileInput.value = n.formatDate(n.selectedDates[0], n.mobileFormatStr)), n.config.minDate && (n.mobileInput.min = n.formatDate(n.config.minDate, "Y-m-d")), n.config.maxDate && (n.mobileInput.max = n.formatDate(n.config.maxDate, "Y-m-d")), n.input.getAttribute("step") && (n.mobileInput.step = String(n.input.getAttribute("step"))), n.input.type = "hidden", n.altInput !== void 0 && (n.altInput.type = "hidden");
    try {
      n.input.parentNode && n.input.parentNode.insertBefore(n.mobileInput, n.input.nextSibling);
    } catch {
    }
    h2(n.mobileInput, "change", function(e3) {
      n.setDate(J(e3).value, false, n.mobileFormatStr), I2("onChange"), I2("onClose");
    });
  }
  function Pe2(e2) {
    if (n.isOpen === true) return n.close();
    n.open(e2);
  }
  function I2(e2, t2) {
    if (n.config !== void 0) {
      var r2 = n.config[e2];
      if (r2 !== void 0 && r2.length > 0) for (var i2 = 0; r2[i2] && i2 < r2.length; i2++) r2[i2](n.selectedDates, n.input.value, n, t2);
      e2 === "onChange" && (n.input.dispatchEvent(Fe2("change")), n.input.dispatchEvent(Fe2("input")));
    }
  }
  function Fe2(e2) {
    var t2 = document.createEvent("Event");
    return t2.initEvent(e2, true, true), t2;
  }
  function L2(e2) {
    for (var t2 = 0; t2 < n.selectedDates.length; t2++) {
      var r2 = n.selectedDates[t2];
      if (r2 instanceof Date && X(r2, e2) === 0) return "" + t2;
    }
    return false;
  }
  function R2(e2) {
    return n.config.mode !== "range" || n.selectedDates.length < 2 ? false : X(e2, n.selectedDates[0]) >= 0 && X(e2, n.selectedDates[1]) <= 0;
  }
  function z2() {
    n.config.noCalendar || n.isMobile || !n.monthNav || (n.yearElements.forEach(function(e2, t2) {
      var r2 = new Date(n.currentYear, n.currentMonth, 1);
      r2.setMonth(n.currentMonth + t2), n.config.showMonths > 1 || n.config.monthSelectorType === "static" ? n.monthElements[t2].textContent = bt(r2.getMonth(), n.config.shorthandCurrentMonth, n.l10n) + " " : n.monthsDropdownContainer.value = r2.getMonth().toString(), e2.value = r2.getFullYear().toString();
    }), n._hidePrevMonthArrow = n.config.minDate !== void 0 && (n.currentYear === n.config.minDate.getFullYear() ? n.currentMonth <= n.config.minDate.getMonth() : n.currentYear < n.config.minDate.getFullYear()), n._hideNextMonthArrow = n.config.maxDate !== void 0 && (n.currentYear === n.config.maxDate.getFullYear() ? n.currentMonth + 1 > n.config.maxDate.getMonth() : n.currentYear > n.config.maxDate.getFullYear()));
  }
  function Ie2(e2) {
    var t2 = e2 || (n.config.altInput ? n.config.altFormat : n.config.dateFormat);
    return n.selectedDates.map(function(e3) {
      return n.formatDate(e3, t2);
    }).filter(function(e3, t3, r2) {
      return n.config.mode !== "range" || n.config.enableTime || r2.indexOf(e3) === t3;
    }).join(n.config.mode === "range" ? n.l10n.rangeSeparator : n.config.conjunction);
  }
  function B2(e2) {
    e2 === void 0 && (e2 = true), n.mobileInput !== void 0 && n.mobileFormatStr && (n.mobileInput.value = n.latestSelectedDateObj === void 0 ? "" : n.formatDate(n.latestSelectedDateObj, n.mobileFormatStr)), n.input.value = Ie2(n.config.dateFormat), n.altInput !== void 0 && (n.altInput.value = Ie2(n.config.altFormat)), e2 !== false && I2("onValueUpdate");
  }
  function Le2(e2) {
    var t2 = J(e2), r2 = n.prevMonthNav.contains(t2), i2 = n.nextMonthNav.contains(t2);
    r2 || i2 ? ue2(r2 ? -1 : 1) : n.yearElements.indexOf(t2) >= 0 ? t2.select() : t2.classList.contains("arrowUp") ? n.changeYear(n.currentYear + 1) : t2.classList.contains("arrowDown") && n.changeYear(n.currentYear - 1);
  }
  function Re2(e2) {
    e2.preventDefault();
    var t2 = e2.type === "keydown", r2 = J(e2), i2 = r2;
    n.amPM !== void 0 && r2 === n.amPM && (n.amPM.textContent = n.l10n.amPM[G(n.amPM.textContent === n.l10n.amPM[0])]);
    var a2 = parseFloat(i2.getAttribute("min")), o2 = parseFloat(i2.getAttribute("max")), s2 = parseFloat(i2.getAttribute("step")), c2 = parseInt(i2.value, 10), l2 = c2 + s2 * (e2.delta || (t2 ? e2.which === 38 ? 1 : -1 : 0));
    if (i2.value !== void 0 && i2.value.length === 2) {
      var u2 = i2 === n.hourElement, d2 = i2 === n.minuteElement;
      l2 < a2 ? (l2 = o2 + l2 + G(!u2) + (G(u2) && G(!n.amPM)), d2 && b(void 0, -1, n.hourElement)) : l2 > o2 && (l2 = i2 === n.hourElement ? l2 - o2 - G(!n.amPM) : a2, d2 && b(void 0, 1, n.hourElement)), n.amPM && u2 && (s2 === 1 ? l2 + c2 === 23 : Math.abs(l2 - c2) > s2) && (n.amPM.textContent = n.l10n.amPM[G(n.amPM.textContent === n.l10n.amPM[0])]), i2.value = W(l2);
    }
  }
  return i(), n;
}
function Nt(e, t) {
  for (var n = Array.prototype.slice.call(e).filter(function(e2) {
    return e2 instanceof HTMLElement;
  }), r = [], i = 0; i < n.length; i++) {
    var a = n[i];
    try {
      if (a.getAttribute("data-fp-omit") !== null) continue;
      a._flatpickr !== void 0 && (a._flatpickr.destroy(), a._flatpickr = void 0), a._flatpickr = Mt(a, t || {}), r.push(a._flatpickr);
    } catch (e2) {
      console.error(e2);
    }
  }
  return r.length === 1 ? r[0] : r;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(e) {
  return Nt(this, e);
}, HTMLElement.prototype.flatpickr = function(e) {
  return Nt([this], e);
});
var Q = function(e, t) {
  return typeof e == "string" ? Nt(window.document.querySelectorAll(e), t) : e instanceof Node ? Nt([e], t) : Nt(e, t);
};
Q.defaultConfig = {}, Q.l10ns = {
  en: Z({}, pt),
  default: Z({}, pt)
}, Q.localize = function(e) {
  Q.l10ns.default = Z(Z({}, Q.l10ns.default), e);
}, Q.setDefaults = function(e) {
  Q.defaultConfig = Z(Z({}, Q.defaultConfig), e);
}, Q.parseDate = wt({}), Q.formatDate = Ct({}), Q.compareDates = X, typeof jQuery < "u" && jQuery.fn !== void 0 && (jQuery.fn.flatpickr = function(e) {
  return Nt(this, e);
}), Date.prototype.fp_incr = function(e) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof e == "string" ? parseInt(e, 10) : e));
}, typeof window < "u" && (window.flatpickr = Q);
var Pt = [
  "onChange",
  "onClose",
  "onDestroy",
  "onMonthChange",
  "onOpen",
  "onYearChange"
];
var Ft = [
  "onValueUpdate",
  "onDayCreate",
  "onParseConfig",
  "onReady",
  "onPreCalendarPosition",
  "onKeyDown"
];
function $(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function It(e) {
  return e instanceof Array ? e : [e];
}
function Lt(e) {
  return e && e.length ? e : null;
}
var Rt = [...Pt, ...Ft];
var zt = ["locale", "showMonths"];
var Bt = defineComponent({
  name: "FlatPickr",
  compatConfig: { MODE: 3 },
  render() {
    return h("input", {
      type: "text",
      "data-input": true,
      disabled: this.disabled,
      onInput: this.onInput
    });
  },
  emits: [
    "blur",
    "update:modelValue",
    ...Rt.map($)
  ],
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Date,
        Array,
        null
      ],
      required: true
    },
    config: {
      type: Object,
      default: () => ({
        defaultDate: null,
        wrap: false
      })
    },
    events: {
      type: Array,
      default: () => Pt
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { fp: null };
  },
  mounted() {
    this.fp || (this.fp = Q(this.getElem(), this.prepareConfig()), this.fpInput().addEventListener("blur", this.onBlur), this.$watch("disabled", this.watchDisabled, { immediate: true }));
  },
  methods: {
    prepareConfig() {
      let e = Object.assign({}, this.config);
      this.events.forEach((t2) => {
        let n = Q.defaultConfig[t2] || [];
        e[t2] = It(e[t2] || []).concat(n, (...e2) => {
          this.$emit($(t2), ...e2);
        });
      });
      let t = this.onClose.bind(this);
      return e.onClose = It(e.onClose || []).concat(t), e.defaultDate = this.modelValue || e.defaultDate, e;
    },
    getElem() {
      return this.config.wrap ? this.$el.parentNode : this.$el;
    },
    onInput(e) {
      let t = e.target;
      nextTick().then(() => {
        this.$emit("update:modelValue", Lt(t.value));
      });
    },
    fpInput() {
      return this.fp.altInput || this.fp.input;
    },
    onBlur(e) {
      this.$emit("blur", Lt(e.target.value));
    },
    onClose(e, t) {
      this.$emit("update:modelValue", t);
    },
    watchDisabled(e) {
      e ? this.fpInput().setAttribute("disabled", "") : this.fpInput().removeAttribute("disabled");
    }
  },
  watch: {
    config: {
      deep: true,
      handler(e) {
        if (!this.fp) return;
        let t = Object.assign({}, e);
        Rt.forEach((e2) => {
          delete t[e2];
        }), this.fp.set(t), zt.forEach((e2) => {
          t[e2] !== void 0 && this.fp.set(e2, t[e2]);
        });
      }
    },
    modelValue(e) {
      var t;
      !this.$el || e === Lt(this.$el.value) || (t = this.fp) == null || t.setDate(e, true);
    }
  },
  beforeUnmount() {
    this.fp && (this.fp = (this.fpInput().removeEventListener("blur", this.onBlur), this.fp.destroy(), null));
  }
});
var Vt = {
  name: "FbTextarea",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    state: {
      type: Boolean,
      default: null
    },
    formatter: {
      type: Function,
      default: null
    },
    lazyFormatter: {
      type: Boolean,
      default: false
    },
    rows: {
      type: [String, Number],
      default: 2
    },
    maxRows: {
      type: [String, Number],
      default: null
    },
    noResize: {
      type: Boolean,
      default: false
    },
    noAutoShrink: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: String,
      default: "soft"
    },
    mask: {
      type: String,
      default: null
    },
    limit: {
      type: [Number, String],
      default: null
    }
  },
  emits: [
    "update:modelValue",
    "change",
    "blur",
    "input"
  ],
  setup(e, { emit: t, attrs: n }) {
    let i = ref(null), a = ref("auto"), o = () => {
      let t2 = i.value;
      if (!t2) return;
      let n2 = e.maxRows ? e.maxRows * 24 : null;
      e.noAutoShrink || (t2.style.height = "auto");
      let r = t2.scrollHeight;
      n2 && r > n2 ? (t2.style.height = `${n2}px`, t2.style.overflowY = "scroll") : (t2.style.height = `${r}px`, t2.style.overflowY = "hidden");
    }, s = (t2, n2) => e.formatter && (!e.lazyFormatter || n2.type === "change") ? e.formatter(t2, n2) : t2, c = (e2) => {
      let { value: n2 } = e2.target, r = s(n2, e2);
      r !== n2 && (e2.target.value = r), t("update:modelValue", r), t("input", r);
    };
    onMounted(() => {
      nextTick(o);
    }), watch(() => e.modelValue, () => {
      nextTick(o);
    });
    let l = (e2) => {
      let { value: n2 } = e2.target;
      t("change", s(n2, e2));
    }, u = computed(() => ["fb-textarea", {
      "fb-textarea--invalid": e.state === false,
      "fb-textarea--valid": e.state === true,
      "fb-textarea--no-resize": e.noResize
    }]);
    return () => h("textarea", {
      ...n,
      class: u.value,
      value: e.modelValue,
      rows: e.rows,
      wrap: e.wrap,
      maxlength: e.limit,
      onInput: c,
      onChange: l,
      onBlur: (e2) => t("blur", e2),
      style: {
        height: a.value,
        overflowY: e.maxRows ? "auto" : "hidden"
      }
    });
  }
};
var Ht = {
  name: "FbRadio",
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Object
      ],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: Boolean,
      default: null
    },
    button: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      type: String,
      default: "primary"
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    let n = (e2) => {
      t("update:modelValue", e2), t("change", e2);
    }, i = computed(() => [
      "fb-radio-group",
      { "fb-radio-group--stacked": !e.inline },
      { "fb-radio-group--inline": e.inline }
    ]), a = (t2) => [e.button ? "fb-radio__label--button" : "fb-radio__label", {
      [`fb-radio__label--button--${e.buttonVariant}`]: e.button,
      "fb-radio__label--button--active": e.button && e.modelValue === t2.value,
      "is-invalid": e.state === false,
      "is-valid": e.state === true,
      disabled: t2.disabled
    }];
    return () => h("div", { class: i.value }, e.options.map((t2, r) => {
      let i2 = `${e.name}-${r}`, o = e.modelValue === t2.value;
      return h("div", {
        class: "fb-radio",
        key: r
      }, [h("input", {
        type: "radio",
        id: i2,
        name: e.name,
        value: t2.value,
        checked: o,
        disabled: t2.disabled ?? false,
        class: "fb-radio__input",
        onChange: () => n(t2.value)
      }), h("label", {
        class: [
          ...a(t2),
          r === 0 ? "fb-radio__label--button--is-first" : "",
          r === e.options.length - 1 ? "fb-radio__label--button--is-last" : ""
        ],
        for: i2
      }, t2.label)]);
    }));
  }
};
var Ut = {
  name: "FbCheckbox",
  props: {
    id: {
      type: String,
      default: void 0
    },
    modelValue: {
      type: [
        Boolean,
        Array,
        String,
        Number
      ],
      default: void 0
    },
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [
        Boolean,
        String,
        Number,
        Function
      ],
      default: true
    },
    unvalue: {
      type: [
        Boolean,
        String,
        Number,
        Function
      ],
      default: false
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: Boolean,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      type: String,
      default: "primary"
    },
    switch: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    e.modelValue === void 0 && t("update:modelValue", e.multiple ? [] : e.unvalue);
    let n = (t2) => !e.modelValue || t2 === void 0 ? false : e.multiple ? Array.isArray(e.modelValue) && e.modelValue.includes(t2) : e.modelValue === t2, i = (n2) => {
      let r;
      if (e.multiple) {
        r = [...e.modelValue];
        let t2 = r.indexOf(n2);
        t2 > -1 ? r.splice(t2, 1) : r.push(n2);
      } else r = e.modelValue === n2 ? e.unvalue : n2;
      t("update:modelValue", r), t("change", r);
    }, a = computed(() => ["fb-checkbox-group", {
      "fb-checkbox-group--inline": e.inline,
      "fb-checkbox-group--vertical": !e.inline
    }]), o = (t2) => [e.button ? "fb-checkbox__label--button" : e.switch ? "fb-checkbox__label--switch" : "fb-checkbox__label", {
      [`fb-checkbox__label--button--${e.buttonVariant}`]: e.button,
      "fb-checkbox__label--button--active": e.button && n(t2.value),
      "is-invalid": e.state === false,
      "is-valid": e.state === true,
      disabled: t2.disabled
    }];
    return (() => {
      if (e.multiple) return () => h("div", { class: a.value }, e.options.map((t2, r) => {
        let a2 = `${e.name}-${r}`, s = n(t2.value);
        return h("div", {
          class: "fb-checkbox",
          key: r
        }, [h("input", {
          type: "checkbox",
          id: a2,
          name: e.name,
          value: t2.value,
          checked: s,
          disabled: t2.disabled,
          class: "fb-checkbox__input",
          onChange: () => i(t2.value)
        }), h("label", {
          class: [
            ...o(t2),
            r === 0 && e.button ? "fb-checkbox__label--button--is-first" : "",
            r === e.options.length - 1 && e.button ? "fb-checkbox__label--button--is-last" : ""
          ],
          for: a2
        }, t2.label)]);
      }));
      {
        let t2 = e.id || `${e.name}`;
        return () => h("div", { class: "fb-checkbox fb-checkbox--is-simple" }, [h("input", {
          type: "checkbox",
          id: t2,
          name: e.name,
          value: e.value,
          checked: n(e.value),
          class: "fb-checkbox__input",
          onChange: () => i(e.value)
        }), h("span", {
          class: [...o(e), e.button ? "fb-checkbox__label--button--is-simple" : ""],
          for: t2
        }, "")]);
      }
    })();
  }
};
var Wt = {
  input: {
    component: Ae,
    supportsLabelFor: true
  },
  select: {
    component: ut,
    supportsLabelFor: false
  },
  flatpickr: {
    component: Bt,
    supportsLabelFor: false
  },
  textarea: {
    component: Vt,
    supportsLabelFor: true
  },
  radio: {
    component: Ht,
    supportsLabelFor: false
  },
  checkbox: {
    component: Ut,
    supportsLabelFor: false
  }
};
var Gt = () => Wt;
var Kt = ({ input: e, formData: t, errors: n, slotProps: r }) => {
  let i = Gt(), a = e.component || "input", o = i[a], s = o.component || resolveDynamicComponent(e.component);
  o.supportsLabelFor;
  let c = t.value[e.model];
  if (c === void 0) switch (a) {
    case "checkbox":
      c = void 0;
      break;
    case "select":
      c = null;
      break;
    default:
      c = "";
  }
  let l = {
    id: r.id,
    modelValue: c,
    "onUpdate:modelValue": (n2) => t.value[e.model] = n2,
    state: r.state,
    "aria-describedby": r.ariaDescribedby,
    ...e.iProps,
    ...Object.fromEntries(Object.entries(e.events || {}).map(([e2, n2]) => [`on${e2.charAt(0).toUpperCase() + e2.slice(1)}`, (e3) => n2(e3, t)]))
  }, u = "fb-input-block__control", d = a === "flatpickr", p = h(s, {
    ...l,
    class: [d ? u : "", { [`${u}--invalid`]: r.state === false }]
  }, { "no-options": () => "Desculpe, sem opções no momento!" });
  if (s !== Ae) {
    let t2 = resolveDirective("maska"), n2 = resolveDirective("limit-chars"), r2 = [];
    return e.maska && t2 && r2.push([t2, e.maska]), e.limitChars && n2 && r2.push([n2, e.limitChars]), r2.length ? withDirectives(p, r2) : p;
  }
  return p;
};
var qt = {
  name: "FormInputsBlocks",
  props: {
    input: {
      type: Object,
      required: true
    },
    inputKey: {
      type: [Number, String],
      default: 0
    }
  },
  setup(e) {
    let n = inject("formData"), r = inject("errors"), i = Gt();
    return () => {
      var _a;
      let { input: a } = e;
      if (((_a = a.dependent) == null ? void 0 : _a.value) === false) return null;
      let o = (i[a.component] || {}).supportsLabelFor ?? true;
      return a.component === "checkbox" && !a.iProps.hasOwnProperty("multiple") && (o = true), h(Transition, { name: "fade" }, { default: () => h(F, {
        cols: 12,
        ...a.colProps
      }, { default: () => {
        var _a2, _b;
        return h(ke, {
          id: `input-${a.model}`,
          label: a.label,
          labelFor: a.labelFor ? a.labelFor : o,
          state: ((_a2 = r.value) == null ? void 0 : _a2[a.back]) ? false : null,
          invalidFeedback: (_b = r.value) == null ? void 0 : _b[a.back],
          ...a.inputBlockProps
        }, { default: (e2) => Kt({
          input: a,
          formData: n,
          errors: r,
          slotProps: e2
        }) });
      } }) });
    };
  }
};
var Jt = {
  name: "FormBlocksRepeaterItem",
  props: {
    forms: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    uid: {
      type: String,
      default: "uid"
    },
    index: Number
  },
  setup(e, { slots: t }) {
    let n = inject("errors", {}), r = Gt();
    return () => {
      let { forms: i, uid: a, index: o } = e, s = toRef(e, "formData");
      return h(F, { cols: 12 }, { default: () => h(P, null, { default: () => i.map((i2, a2) => {
        let o2 = `input(${i2.formKey || a2})`;
        if (t[o2]) return t[o2]({
          input: i2,
          index: a2
        });
        let c = `fb-${e.uid}-${e.index}-${i2.model}`, l = (r[i2.component] || {}).supportsLabelFor ?? true;
        return h(F, {
          key: a2,
          cols: 12,
          ...i2.colProps
        }, { default: () => h(ke, {
          id: c,
          label: i2.label,
          labelFor: i2.labelFor ? c : l,
          state: n[i2.back] ? false : null,
          invalidFeedback: n[i2.back],
          ...i2.inputBlockProps
        }, { default: (e2) => Kt({
          input: i2,
          formData: s,
          errors: n,
          slotProps: e2
        }) }) });
      }) }) });
    };
  }
};
var Yt = me(O((e, t) => {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, a = "[object Arguments]", o = "[object Array]", s = "[object Boolean]", c = "[object Date]", l = "[object Error]", u = "[object Function]", d = "[object GeneratorFunction]", f = "[object Map]", p = "[object Number]", m = "[object Object]", h2 = "[object Promise]", g = "[object RegExp]", _ = "[object Set]", v = "[object String]", y = "[object Symbol]", b = "[object WeakMap]", ee = "[object ArrayBuffer]", x = "[object DataView]", S = "[object Float32Array]", C = "[object Float64Array]", te = "[object Int8Array]", w = "[object Int16Array]", ne = "[object Int32Array]", re = "[object Uint8Array]", T = "[object Uint8ClampedArray]", ie = "[object Uint16Array]", ae = "[object Uint32Array]", oe = /[\\^$.*+?()[\]{}|]/g, se = /\w*$/, ce = /^\[object .+?Constructor\]$/, le2 = /^(?:0|[1-9]\d*)$/, E2 = {};
  E2[a] = E2[o] = E2[ee] = E2[x] = E2[s] = E2[c] = E2[S] = E2[C] = E2[te] = E2[w] = E2[ne] = E2[f] = E2[p] = E2[m] = E2[g] = E2[_] = E2[v] = E2[y] = E2[re] = E2[T] = E2[ie] = E2[ae] = true, E2[l] = E2[u] = E2[b] = false;
  var ue2 = typeof global == "object" && global && global.Object === Object && global, de2 = typeof self == "object" && self && self.Object === Object && self, D2 = ue2 || de2 || Function("return this")(), fe2 = typeof e == "object" && e && !e.nodeType && e, O2 = fe2 && typeof t == "object" && t && !t.nodeType && t, pe2 = O2 && O2.exports === fe2;
  function me2(e2, t2) {
    return e2.set(t2[0], t2[1]), e2;
  }
  function k2(e2, t2) {
    return e2.add(t2), e2;
  }
  function he2(e2, t2) {
    for (var n2 = -1, r2 = e2 ? e2.length : 0; ++n2 < r2 && t2(e2[n2], n2, e2) !== false; ) ;
    return e2;
  }
  function ge2(e2, t2) {
    for (var n2 = -1, r2 = t2.length, i2 = e2.length; ++n2 < r2; ) e2[i2 + n2] = t2[n2];
    return e2;
  }
  function _e2(e2, t2, n2, r2) {
    var i2 = -1, a2 = e2 ? e2.length : 0;
    for (r2 && a2 && (n2 = e2[++i2]); ++i2 < a2; ) n2 = t2(n2, e2[i2], i2, e2);
    return n2;
  }
  function ve2(e2, t2) {
    for (var n2 = -1, r2 = Array(e2); ++n2 < e2; ) r2[n2] = t2(n2);
    return r2;
  }
  function ye2(e2, t2) {
    return e2 == null ? void 0 : e2[t2];
  }
  function be2(e2) {
    var t2 = false;
    if (e2 != null && typeof e2.toString != "function") try {
      t2 = !!(e2 + "");
    } catch {
    }
    return t2;
  }
  function xe2(e2) {
    var t2 = -1, n2 = Array(e2.size);
    return e2.forEach(function(e3, r2) {
      n2[++t2] = [r2, e3];
    }), n2;
  }
  function Se2(e2, t2) {
    return function(n2) {
      return e2(t2(n2));
    };
  }
  function A2(e2) {
    var t2 = -1, n2 = Array(e2.size);
    return e2.forEach(function(e3) {
      n2[++t2] = e3;
    }), n2;
  }
  var Ce2 = Array.prototype, we2 = Function.prototype, Te2 = Object.prototype, Ee2 = D2["__core-js_shared__"], De2 = function() {
    var e2 = /[^.]+$/.exec(Ee2 && Ee2.keys && Ee2.keys.IE_PROTO || "");
    return e2 ? "Symbol(src)_1." + e2 : "";
  }(), j2 = we2.toString, M2 = Te2.hasOwnProperty, N2 = Te2.toString, P2 = RegExp("^" + j2.call(M2).replace(oe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Oe2 = pe2 ? D2.Buffer : void 0, F2 = D2.Symbol, ke2 = D2.Uint8Array, Ae2 = Se2(Object.getPrototypeOf, Object), je2 = Object.create, Me2 = Te2.propertyIsEnumerable, Ne2 = Ce2.splice, Pe2 = Object.getOwnPropertySymbols, I2 = Oe2 ? Oe2.isBuffer : void 0, Fe2 = Se2(Object.keys, Object), L2 = Ot2(D2, "DataView"), R2 = Ot2(D2, "Map"), z2 = Ot2(D2, "Promise"), Ie2 = Ot2(D2, "Set"), B2 = Ot2(D2, "WeakMap"), Le2 = Ot2(Object, "create"), Re2 = $2(L2), ze2 = $2(R2), Be2 = $2(z2), Ve2 = $2(Ie2), He2 = $2(B2), Ue2 = F2 ? F2.prototype : void 0, We2 = Ue2 ? Ue2.valueOf : void 0;
  function V2(e2) {
    var t2 = -1, n2 = e2 ? e2.length : 0;
    for (this.clear(); ++t2 < n2; ) {
      var r2 = e2[t2];
      this.set(r2[0], r2[1]);
    }
  }
  function Ge2() {
    this.__data__ = Le2 ? Le2(null) : {};
  }
  function Ke2(e2) {
    return this.has(e2) && delete this.__data__[e2];
  }
  function qe2(e2) {
    var t2 = this.__data__;
    if (Le2) {
      var n2 = t2[e2];
      return n2 === r ? void 0 : n2;
    }
    return M2.call(t2, e2) ? t2[e2] : void 0;
  }
  function Je2(e2) {
    var t2 = this.__data__;
    return Le2 ? t2[e2] !== void 0 : M2.call(t2, e2);
  }
  function Ye2(e2, t2) {
    var n2 = this.__data__;
    return n2[e2] = Le2 && t2 === void 0 ? r : t2, this;
  }
  V2.prototype.clear = Ge2, V2.prototype.delete = Ke2, V2.prototype.get = qe2, V2.prototype.has = Je2, V2.prototype.set = Ye2;
  function H2(e2) {
    var t2 = -1, n2 = e2 ? e2.length : 0;
    for (this.clear(); ++t2 < n2; ) {
      var r2 = e2[t2];
      this.set(r2[0], r2[1]);
    }
  }
  function Xe2() {
    this.__data__ = [];
  }
  function Ze2(e2) {
    var t2 = this.__data__, n2 = W2(t2, e2);
    return n2 < 0 ? false : (n2 == t2.length - 1 ? t2.pop() : Ne2.call(t2, n2, 1), true);
  }
  function Qe2(e2) {
    var t2 = this.__data__, n2 = W2(t2, e2);
    return n2 < 0 ? void 0 : t2[n2][1];
  }
  function $e2(e2) {
    return W2(this.__data__, e2) > -1;
  }
  function et2(e2, t2) {
    var n2 = this.__data__, r2 = W2(n2, e2);
    return r2 < 0 ? n2.push([e2, t2]) : n2[r2][1] = t2, this;
  }
  H2.prototype.clear = Xe2, H2.prototype.delete = Ze2, H2.prototype.get = Qe2, H2.prototype.has = $e2, H2.prototype.set = et2;
  function U2(e2) {
    var t2 = -1, n2 = e2 ? e2.length : 0;
    for (this.clear(); ++t2 < n2; ) {
      var r2 = e2[t2];
      this.set(r2[0], r2[1]);
    }
  }
  function tt2() {
    this.__data__ = {
      hash: new V2(),
      map: new (R2 || H2)(),
      string: new V2()
    };
  }
  function nt2(e2) {
    return Dt2(this, e2).delete(e2);
  }
  function rt2(e2) {
    return Dt2(this, e2).get(e2);
  }
  function it2(e2) {
    return Dt2(this, e2).has(e2);
  }
  function at2(e2, t2) {
    return Dt2(this, e2).set(e2, t2), this;
  }
  U2.prototype.clear = tt2, U2.prototype.delete = nt2, U2.prototype.get = rt2, U2.prototype.has = it2, U2.prototype.set = at2;
  function ot2(e2) {
    this.__data__ = new H2(e2);
  }
  function st2() {
    this.__data__ = new H2();
  }
  function ct2(e2) {
    return this.__data__.delete(e2);
  }
  function lt2(e2) {
    return this.__data__.get(e2);
  }
  function ut2(e2) {
    return this.__data__.has(e2);
  }
  function dt2(e2, t2) {
    var r2 = this.__data__;
    if (r2 instanceof H2) {
      var i2 = r2.__data__;
      if (!R2 || i2.length < n - 1) return i2.push([e2, t2]), this;
      r2 = this.__data__ = new U2(i2);
    }
    return r2.set(e2, t2), this;
  }
  ot2.prototype.clear = st2, ot2.prototype.delete = ct2, ot2.prototype.get = lt2, ot2.prototype.has = ut2, ot2.prototype.set = dt2;
  function ft2(e2, t2) {
    var n2 = zt2(e2) || Rt2(e2) ? ve2(e2.length, String) : [], r2 = n2.length, i2 = !!r2;
    for (var a2 in e2) (t2 || M2.call(e2, a2)) && !(i2 && (a2 == "length" || Nt2(a2, r2))) && n2.push(a2);
    return n2;
  }
  function pt2(e2, t2, n2) {
    var r2 = e2[t2];
    (!(M2.call(e2, t2) && Lt2(r2, n2)) || n2 === void 0 && !(t2 in e2)) && (e2[t2] = n2);
  }
  function W2(e2, t2) {
    for (var n2 = e2.length; n2--; ) if (Lt2(e2[n2][0], t2)) return n2;
    return -1;
  }
  function G2(e2, t2) {
    return e2 && X2(t2, qt2(t2), e2);
  }
  function mt2(e2, t2, n2, r2, i2, o2, s2) {
    var c2;
    if (r2 && (c2 = o2 ? r2(e2, i2, o2, s2) : r2(e2)), c2 !== void 0) return c2;
    if (!Gt2(e2)) return e2;
    var l2 = zt2(e2);
    if (l2) {
      if (c2 = At2(e2), !t2) return wt2(e2, c2);
    } else {
      var f2 = Z2(e2), p2 = f2 == u || f2 == d;
      if (Ht2(e2)) return vt2(e2, t2);
      if (f2 == m || f2 == a || p2 && !o2) {
        if (be2(e2)) return o2 ? e2 : {};
        if (c2 = jt2(p2 ? {} : e2), !t2) return Tt2(e2, G2(c2, e2));
      } else {
        if (!E2[f2]) return o2 ? e2 : {};
        c2 = Mt2(e2, f2, mt2, t2);
      }
    }
    s2 || (s2 = new ot2());
    var h3 = s2.get(e2);
    if (h3) return h3;
    if (s2.set(e2, c2), !l2) var g2 = n2 ? Et2(e2) : qt2(e2);
    return he2(g2 || e2, function(i3, a2) {
      g2 && (a2 = i3, i3 = e2[a2]), pt2(c2, a2, mt2(i3, t2, n2, r2, a2, e2, s2));
    }), c2;
  }
  function ht2(e2) {
    return Gt2(e2) ? je2(e2) : {};
  }
  function K2(e2, t2, n2) {
    var r2 = t2(e2);
    return zt2(e2) ? r2 : ge2(r2, n2(e2));
  }
  function q2(e2) {
    return N2.call(e2);
  }
  function gt2(e2) {
    return !Gt2(e2) || Pt2(e2) ? false : (Ut2(e2) || be2(e2) ? P2 : ce).test($2(e2));
  }
  function _t2(e2) {
    if (!Ft2(e2)) return Fe2(e2);
    var t2 = [];
    for (var n2 in Object(e2)) M2.call(e2, n2) && n2 != "constructor" && t2.push(n2);
    return t2;
  }
  function vt2(e2, t2) {
    if (t2) return e2.slice();
    var n2 = new e2.constructor(e2.length);
    return e2.copy(n2), n2;
  }
  function J2(e2) {
    var t2 = new e2.constructor(e2.byteLength);
    return new ke2(t2).set(new ke2(e2)), t2;
  }
  function yt2(e2, t2) {
    var n2 = t2 ? J2(e2.buffer) : e2.buffer;
    return new e2.constructor(n2, e2.byteOffset, e2.byteLength);
  }
  function bt2(e2, t2, n2) {
    return _e2(t2 ? n2(xe2(e2), true) : xe2(e2), me2, new e2.constructor());
  }
  function xt2(e2) {
    var t2 = new e2.constructor(e2.source, se.exec(e2));
    return t2.lastIndex = e2.lastIndex, t2;
  }
  function Y2(e2, t2, n2) {
    return _e2(t2 ? n2(A2(e2), true) : A2(e2), k2, new e2.constructor());
  }
  function St2(e2) {
    return We2 ? Object(We2.call(e2)) : {};
  }
  function Ct2(e2, t2) {
    var n2 = t2 ? J2(e2.buffer) : e2.buffer;
    return new e2.constructor(n2, e2.byteOffset, e2.length);
  }
  function wt2(e2, t2) {
    var n2 = -1, r2 = e2.length;
    for (t2 || (t2 = Array(r2)); ++n2 < r2; ) t2[n2] = e2[n2];
    return t2;
  }
  function X2(e2, t2, n2, r2) {
    n2 || (n2 = {});
    for (var i2 = -1, a2 = t2.length; ++i2 < a2; ) {
      var o2 = t2[i2], s2 = r2 ? r2(n2[o2], e2[o2], o2, n2, e2) : void 0;
      pt2(n2, o2, s2 === void 0 ? e2[o2] : s2);
    }
    return n2;
  }
  function Tt2(e2, t2) {
    return X2(e2, kt2(e2), t2);
  }
  function Et2(e2) {
    return K2(e2, qt2, kt2);
  }
  function Dt2(e2, t2) {
    var n2 = e2.__data__;
    return Q2(t2) ? n2[typeof t2 == "string" ? "string" : "hash"] : n2.map;
  }
  function Ot2(e2, t2) {
    var n2 = ye2(e2, t2);
    return gt2(n2) ? n2 : void 0;
  }
  var kt2 = Pe2 ? Se2(Pe2, Object) : Jt2, Z2 = q2;
  (L2 && Z2(new L2(new ArrayBuffer(1))) != x || R2 && Z2(new R2()) != f || z2 && Z2(z2.resolve()) != h2 || Ie2 && Z2(new Ie2()) != _ || B2 && Z2(new B2()) != b) && (Z2 = function(e2) {
    var t2 = N2.call(e2), n2 = t2 == m ? e2.constructor : void 0, r2 = n2 ? $2(n2) : void 0;
    if (r2) switch (r2) {
      case Re2:
        return x;
      case ze2:
        return f;
      case Be2:
        return h2;
      case Ve2:
        return _;
      case He2:
        return b;
    }
    return t2;
  });
  function At2(e2) {
    var t2 = e2.length, n2 = e2.constructor(t2);
    return t2 && typeof e2[0] == "string" && M2.call(e2, "index") && (n2.index = e2.index, n2.input = e2.input), n2;
  }
  function jt2(e2) {
    return typeof e2.constructor == "function" && !Ft2(e2) ? ht2(Ae2(e2)) : {};
  }
  function Mt2(e2, t2, n2, r2) {
    var i2 = e2.constructor;
    switch (t2) {
      case ee:
        return J2(e2);
      case s:
      case c:
        return new i2(+e2);
      case x:
        return yt2(e2, r2);
      case S:
      case C:
      case te:
      case w:
      case ne:
      case re:
      case T:
      case ie:
      case ae:
        return Ct2(e2, r2);
      case f:
        return bt2(e2, r2, n2);
      case p:
      case v:
        return new i2(e2);
      case g:
        return xt2(e2);
      case _:
        return Y2(e2, r2, n2);
      case y:
        return St2(e2);
    }
  }
  function Nt2(e2, t2) {
    return t2 ?? (t2 = i), !!t2 && (typeof e2 == "number" || le2.test(e2)) && e2 > -1 && e2 % 1 == 0 && e2 < t2;
  }
  function Q2(e2) {
    var t2 = typeof e2;
    return t2 == "string" || t2 == "number" || t2 == "symbol" || t2 == "boolean" ? e2 !== "__proto__" : e2 === null;
  }
  function Pt2(e2) {
    return !!De2 && De2 in e2;
  }
  function Ft2(e2) {
    var t2 = e2 && e2.constructor;
    return e2 === (typeof t2 == "function" && t2.prototype || Te2);
  }
  function $2(e2) {
    if (e2 != null) {
      try {
        return j2.call(e2);
      } catch {
      }
      try {
        return e2 + "";
      } catch {
      }
    }
    return "";
  }
  function It2(e2) {
    return mt2(e2, true, true);
  }
  function Lt2(e2, t2) {
    return e2 === t2 || e2 !== e2 && t2 !== t2;
  }
  function Rt2(e2) {
    return Vt2(e2) && M2.call(e2, "callee") && (!Me2.call(e2, "callee") || N2.call(e2) == a);
  }
  var zt2 = Array.isArray;
  function Bt2(e2) {
    return e2 != null && Wt2(e2.length) && !Ut2(e2);
  }
  function Vt2(e2) {
    return Kt2(e2) && Bt2(e2);
  }
  var Ht2 = I2 || Yt2;
  function Ut2(e2) {
    var t2 = Gt2(e2) ? N2.call(e2) : "";
    return t2 == u || t2 == d;
  }
  function Wt2(e2) {
    return typeof e2 == "number" && e2 > -1 && e2 % 1 == 0 && e2 <= i;
  }
  function Gt2(e2) {
    var t2 = typeof e2;
    return !!e2 && (t2 == "object" || t2 == "function");
  }
  function Kt2(e2) {
    return !!e2 && typeof e2 == "object";
  }
  function qt2(e2) {
    return Bt2(e2) ? ft2(e2) : _t2(e2);
  }
  function Jt2() {
    return [];
  }
  function Yt2() {
    return false;
  }
  t.exports = It2;
})(), 1);
function Xt(e) {
  return (0, Yt.default)(e);
}
var Zt = (e) => (/* @__PURE__ */ new Set([
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week"
])).has(e == null ? void 0 : e.toLowerCase());
var { castPrimitive: Qt } = en();
var $t = [
  {
    test: (e) => e.match(/^(sm|md|lg|xl)(\d+)$/),
    apply: (e, t) => {
      let [n, r, i] = t;
      e.colProps = {
        ...e.colProps,
        [r]: i
      };
    }
  },
  {
    test: (e) => /^\d+$/.test(e) ? e : null,
    apply: (e, t) => {
      e.colProps = {
        ...e.colProps,
        cols: t
      };
    }
  },
  {
    test: (e) => Zt(e) ? e : null,
    apply: (e, t) => {
      ["checkbox", "radio"].includes(t) ? e.component = t : [
        "date",
        "datetime-local",
        "month",
        "time",
        "week"
      ].includes(t) ? e.component = "flatpickr" : [
        "range",
        "color",
        "file",
        "image",
        "reset",
        "submit"
      ].includes(t) ? e.iProps = {
        ...e.iProps,
        type: "text"
      } : e.iProps = {
        ...e.iProps,
        type: t
      };
    }
  },
  {
    test: (e) => e.match(/^(?<key>\w+)=(?<value>.+)$/),
    apply: (e, t) => {
      let { key: n, value: r } = t.groups;
      e.iProps = {
        ...e.iProps,
        [n]: Qt(r)
      };
    }
  },
  {
    test: (e) => e === "select" ? e : null,
    apply: (e) => {
      e.component = "select", e.iProps = {
        ...e.iProps,
        reduce: (e2) => e2.value
      };
    }
  }
];
function en() {
  let e = (e2) => e2.replace(/[-_ ](.)/g, (e3, t2) => t2.toUpperCase()).replace(/^(.)/, (e3) => e3.toLowerCase()), t = (e2, t2) => t2 ? t2(e2) : e2, n = (e2, t2, n2, r2 = {}) => {
    if (!Array.isArray(t2) || t2.length < 2 || typeof t2[0] != "string") throw Error("Entrada inválida. O array deve ter um nome, um tipo e pelo menos um valor.");
    let [i2, a2, ...s2] = t2;
    if (typeof a2 != "function") throw Error("O segundo elemento deve ser um construtor de tipo válido.");
    a2 === Object ? e2[i2] = o(s2, n2, r2) : a2 === Array && (e2[i2] = n2[i2]);
  }, r = (e2, t2, n2, r2 = {}) => {
    if (!Array.isArray(t2) || t2.length < 2 || typeof t2[0] != "string") throw Error("Entrada inválida. O array deve ter um nome, um tipo e pelo menos um valor.");
    let [a2, o2, ...s2] = t2;
    if (typeof o2 != "function") throw Error("O segundo elemento deve ser um construtor de tipo válido.");
    if (o2 === Object) return {
      ...e2,
      ...i(s2, n2[a2], r2)
    };
    if (o2 === Array) return {
      ...e2,
      [a2]: n2[a2]
    };
  }, i = (n2, r2, i2 = {}) => n2.reduce((n3, a2) => {
    let o2 = e(a2);
    return r2.hasOwnProperty(a2) && (n3[o2] = t(r2[a2], i2[a2])), n3;
  }, {}), a = (n2, i2, a2 = {}) => n2.reduce((n3, o2) => {
    var _a;
    if (Array.isArray(o2) && o2.length > 0) n3 = {
      ...n3,
      ...r(n3, o2, i2, a2)
    };
    else {
      let r2 = e(o2);
      i2.hasOwnProperty(o2) && (n3[r2] = t(i2[o2], ((_a = a2 == null ? void 0 : a2.formatter) == null ? void 0 : _a[o2]) ?? void 0));
    }
    return n3;
  }, {});
  function o(n2, r2, i2 = {}) {
    return n2.reduce((n3, a2) => {
      var _a;
      let o2 = e(a2);
      return r2.hasOwnProperty(o2) && (n3[a2] = t(r2[o2], ((_a = i2 == null ? void 0 : i2.formatter) == null ? void 0 : _a[a2]) ?? void 0)), n3;
    }, {});
  }
  function s(n2, r2, i2 = {}) {
    return n2.reduce((n3, a2) => {
      if (Array.isArray(a2) && a2.length > 0) n3[a2[0]] = r2[a2[0]];
      else {
        let o2 = e(a2);
        r2.hasOwnProperty(o2) && (n3[a2] = t(r2[o2], i2[a2]));
      }
      return n3;
    }, {});
  }
  function c(r2, i2, a2 = {}) {
    return r2.reduce((r3, o2) => {
      var _a;
      if (Array.isArray(o2) && o2.length > 0) n(r3, o2, i2, a2);
      else {
        let n2 = e(o2);
        i2.hasOwnProperty(n2) && (r3[o2] = t(i2[n2], ((_a = a2 == null ? void 0 : a2.formatter) == null ? void 0 : _a[o2]) ?? void 0));
      }
      return r3;
    }, {});
  }
  return {
    parseToEditData: i,
    parseToDatabase: o,
    parseToModel: (t2) => t2.reduce((t3, n2, r2) => (t3[`model[${r2}]`] = e(n2), t3), {}),
    parseLimitProps: (e2, t2 = [0, e2.length]) => {
      let n2 = (e3) => e3.replace(/[-_ ](.)/g, (e4, t3) => t3.toUpperCase()).replace(/^(.)/, (e4) => e4.toLowerCase()), r2 = 0, i2 = e2.length;
      return typeof t2 == "number" ? i2 = Math.min(t2, e2.length) : Array.isArray(t2) && t2.length === 2 && ([r2, i2] = t2, i2 = Math.min(i2, e2.length)), e2.slice(r2, i2).flatMap((e3) => {
        if (Array.isArray(e3) && e3.length > 2) {
          let [t3, r3, ...i3] = e3;
          return i3.map((e4) => ({
            model: n2(e4),
            back: `${t3}.${e4}`
          }));
        } else if (typeof e3 == "string") return {
          model: n2(e3),
          back: e3
        };
        return [];
      });
    },
    parseToDatabaseWithRepeater: s,
    parseToDatabaseComplex: c,
    parseToEditDataComplex: a,
    parseStringShorthand: (e2) => {
      let [t2, ...n2] = e2.split("::"), r2 = { label: t2 };
      return n2.length > 0 && n2[0].split(":").forEach((e3) => {
        let t3 = false;
        for (let n3 of $t) {
          let i2 = n3.test(e3);
          if (i2) {
            n3.apply(r2, i2), t3 = true;
            break;
          }
        }
        t3 || (r2.iProps = {
          ...r2.iProps,
          [e3]: true
        });
      }), r2;
    },
    castPrimitive: (e2) => {
      if (typeof e2 != "string" || !e2.includes("|")) return e2;
      let [t2, n2] = e2.split("|"), r2 = {
        s: (e3) => String(e3),
        b: (e3) => e3.toLowerCase() === "true",
        n: (e3) => Number(e3),
        g: (e3) => BigInt(e3),
        y: (e3) => Symbol(e3),
        u: () => void 0,
        N: () => null
      };
      return r2[n2] ? r2[n2](t2) : e2;
    }
  };
}
var tn = {
  name: "FbButton",
  props: {
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "button"
    },
    variant: {
      type: String,
      default: "primary"
    },
    texture: {
      type: String,
      default: "carbon"
    },
    clean: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n }) {
    let i = computed(() => e.disabled || e.loading), a = "fb-button", o = computed(() => [
      a,
      `${a}--${e.variant}`,
      {
        [`${a}--pill`]: e.pill,
        [`${a}--circle`]: e.circle,
        [`${a}--flat`]: e.flat,
        [`${a}--loading`]: e.loading,
        [`${a}--disabled`]: i.value,
        [`${a}--texture-${e.texture}`]: !e.clean,
        [`${a}--clean`]: e.clean
      }
    ]), s = (e2) => {
      i.value || t("click", e2);
    };
    return () => h("button", {
      type: e.type,
      class: o.value,
      disabled: i.value,
      onClick: s
    }, [e.loading ? h("span", { class: "fb-button__loader" }) : null, h("span", { class: "fb-button__content" }, n.default ? n.default() : e.label)]);
  }
};
var nn = {
  name: "FormBlocksRepeater",
  props: {
    forms: {
      type: Array,
      default: () => []
    },
    groupModel: {
      type: String,
      default: "groups"
    },
    groupFormData: {
      type: Object,
      default: () => ({})
    },
    btnAddVariant: {
      type: String,
      default: "primary"
    },
    btnAddTexture: {
      type: String,
      default: "carbon"
    },
    btnAddClean: {
      type: Boolean,
      default: false
    },
    btnRemoveVariant: {
      type: String,
      default: "danger"
    },
    btnRemoveTexture: {
      type: String,
      default: "carbon"
    },
    btnRemoveClean: {
      type: Boolean,
      default: false
    },
    noTexture: {
      type: Boolean,
      default: false
    }
  },
  setup(e) {
    let t = inject("formData"), { btnAddVariant: i, btnAddTexture: a, btnAddClean: o, btnRemoveVariant: s, btnRemoveTexture: c, btnRemoveClean: l, noTexture: u } = e, d = Math.random().toString(36).substring(2, 9), m = (e2) => Xt(toRaw(e2));
    t.value && (t.value[e.groupModel] = t.value[e.groupModel] ?? []);
    let h2 = () => {
      t.value[e.groupModel].push(m(e.groupFormData));
    }, g = (n) => {
      let r = t.value[e.groupModel][n];
      r.type ? r.deleted = true : t.value[e.groupModel].splice(n, 1);
    }, _ = computed(() => {
      var _a;
      return ((_a = t.value) == null ? void 0 : _a[e.groupModel]) || [];
    }), y = computed(() => t.value !== void 0 && e.groupModel in t.value);
    return onMounted(() => {
      _.value.length === 0 && h2();
    }), () => {
      if (!y.value) return null;
      let t2 = () => _.value.map((t3, n) => h(P, {
        key: `item-repeater-${d}-${n}`,
        class: [{ "fb-disabled-row-repeater": t3.deleted }]
      }, { default: () => [h(F, { cols: 12 }, { default: () => h("div", { class: "fb-repeater__header" }, [h(tn, {
        class: "fb-btn-repeater-delete",
        variant: s,
        texture: c,
        clean: u || l,
        onClick: () => g(n)
      }, { default: () => "Remover" })]) }), h(Jt, {
        forms: e.forms,
        formData: t3,
        uid: d,
        index: n,
        class: "fb-repeater__content"
      })] }));
      return h("div", { class: "fb-repeater fb-container-fluid" }, [h(TransitionGroup, {
        name: "fb-fade",
        tag: "div"
      }, { default: () => t2() }), h(P, {}, { default: () => [h(F, {
        md: 12,
        lg: 2
      }, { default: () => [h(tn, {
        class: "fb-btn-repeater-add",
        variant: i,
        texture: a,
        clean: u || o,
        onClick: h2
      }, { default: () => "Adicionar" })] })] })]);
    };
  }
};
var rn = {
  name: "FormGroupBlocks",
  props: {
    group: {
      type: Object,
      default: () => ({})
    },
    groupKey: {
      type: [Number, String],
      default: 0
    }
  },
  setup(e, { slots: n }) {
    return () => {
      var _a;
      let { group: r, groupKey: i } = e;
      if (((_a = r.dependent) == null ? void 0 : _a.value) === false) return null;
      let a = () => {
        let e2 = [];
        if (r.noTitle || e2.push(h(F, { cols: 12 }, { default: () => h("h3", { class: "fb-group__title" }, r.title) })), r.isRepeater) {
          let t = n["form-repeater"];
          e2.push(t ? t({
            form: r.forms,
            groupModel: r.groupModel
          }) : h(nn, {
            forms: r.forms,
            groupModel: r.groupModel,
            groupFormData: r.groupFormData,
            ...r.repeaterProps
          }));
        } else {
          let t = r.forms.map((e3, t2) => {
            let r2 = `input(${e3.formKey || t2})`;
            return n[r2] ? n[r2]({
              form: e3,
              index: t2
            }) : h(qt, {
              input: e3,
              inputKey: t2,
              key: e3.label || t2
            }, n);
          });
          e2.push(...t);
        }
        return e2;
      };
      return h(Transition, { name: "fb-fade" }, { default: () => h(P, { class: i > 0 ? "mt-12" : "" }, { default: () => a() }) });
    };
  }
};
var an = {
  name: "FormBlocks",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: [Object, null],
      default: () => ({})
    },
    groups: {
      type: Array,
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(e, { slots: t, emit: n, expose: i }) {
    let a = computed(() => e.modelValue);
    return provide("errors", toRef(e, "errors")), provide("formData", a), i({ formData: a }), () => {
      let { groups: n2 } = e;
      return h("div", { class: "fb-form-blocks" }, n2.map((e2, n3) => {
        let r = `group(${e2.key || n3})`;
        return t[r] ? t[r]({
          group: e2,
          index: n3
        }) : h(rn, {
          key: e2.key || n3,
          group: e2,
          groupKey: n3
        }, t);
      }));
    };
  }
};
var on = {
  name: "FbContainer",
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    let n = "fb-container";
    return () => {
      var _a;
      return h(e.tag, { class: [e.fluid ? `${n}-fluid` : n] }, (_a = t.default) == null ? void 0 : _a.call(t));
    };
  }
};
var sn = {
  beforeMount(e, t) {
    let n = t.value || t.arg || 11, r = (e2) => {
      let t2 = e2.target.value;
      if (t2.length > n) {
        e2.target.value = t2.substring(0, n);
        let r2 = new Event("input", { bubbles: true });
        e2.target.dispatchEvent(r2);
      }
    };
    e.addEventListener("input", r), e._limitCharsHandler = r;
  },
  unmounted(e) {
    e.removeEventListener("input", e._limitCharsHandler);
  }
};
var cn = (e) => {
  e.component("FbContainer", on), e.component("FbRow", P), e.component("FbCol", F), e.component("FbInput", Ae), e.component("FormBlocks", an), e.component("FbTextarea", Vt), e.directive("maska", N), e.directive("limit-chars", sn);
};
var ln = { install: cn };
export {
  tn as FbButton,
  Ut as FbCheckbox,
  F as FbCol,
  on as FbContainer,
  Ae as FbInput,
  Ht as FbRadio,
  P as FbRow,
  Vt as FbTextarea,
  an as FormBlocks,
  nn as FormBlocksRepeater,
  Jt as FormBlocksRepeaterItem,
  rn as FormGroupBlocks,
  qt as FormInputsBlocks,
  ln as default,
  cn as install
};
//# sourceMappingURL=@form-blocks_vue.js.map

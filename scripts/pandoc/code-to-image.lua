-- Replaces every CodeBlock with a rasterized PNG produced by `silicon`,
-- for the "image" build profile (where code must not appear as text).
local counter = 0

function CodeBlock(block)
  counter = counter + 1
  local language = block.classes[1] or "text"
  local filename = "code-" .. counter .. ".png"
  -- silicon infers the output format from the file extension, so it cannot
  -- write to a pipe/stdout: it needs a real .png path to write to first.
  local tmp_path = os.tmpname() .. ".png"

  local args = {
    "--language", language,
    "--background", "#ffffff",
    "--no-window-controls",
    "--output", tmp_path,
  }

  local ok, err = pcall(pandoc.pipe, "silicon", args, block.text)
  if not ok then
    os.remove(tmp_path)
    io.stderr:write("code-to-image.lua: silicon failed, leaving code block as text: " .. tostring(err) .. "\n")
    return block
  end

  local file = io.open(tmp_path, "rb")
  local image_data = file:read("*all")
  file:close()
  os.remove(tmp_path)

  pandoc.mediabag.insert(filename, "image/png", image_data)
  return pandoc.Para({ pandoc.Image({}, filename) })
end

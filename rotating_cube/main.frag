/*
    Borrowed from https://www.shadertoy.com/view/MlcGDB
    uv Normalized coordinates from main func
    p1 Position 1 to draw the line from
    p2 Position 2 to draw the line to
    t  Thickness of the line
*/
float line(vec2 uv, vec2 p1, vec2 p2, float t) 
{
    vec2 g = p2 - p1;
    vec2 h = uv - p1;
    float d = length(h - g * clamp(dot(g, h) / dot(g,g), 0.0, 1.0));
	return smoothstep(t, 0.5*t, d);
}

mat4 rotationY(float angle)
{
    return mat4(
        cos(angle),0,sin(angle),0,
        0,1,0,0,
        -sin(angle),0,cos(angle),0,
        0,0,0,0
    );
}

mat4 rotationX(float angle)
{
    return mat4(
        1,0,0,0,
        0,cos(angle),sin(angle),0,
        0,-sin(angle),cos(angle),0,
        0,0,0,0
    );
}

mat4 scaler(float scale)
{
    return mat4(
        scale,0,0,0,
        0,scale,0,0,
        0,0,scale,0,
        0,0,0,0
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //Normalize coordinates to values 0 -> 1
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y; //0 -> 1


    //Multiply uv.x by aspect ratio of screen
    uv.x *= iResolution.x/iResolution.y;

    //Define set of points
    vec3 points[] = vec3[](
    vec3(-1.0,-1.0,-1.0),
    vec3(-1.0,1.0,-1.0),

    vec3(1.0,-1.0,-1.0),
    vec3(1.0,1.0,-1.0),

    vec3(1.0,-1.0,1.0),
    vec3(-1.0,-1.0,1.0),
    
    vec3(-1.0,1.0,1.0),
    vec3(1.0,1.0,1.0)
    );


    float angle = 0.4*iTime; //Modify?
    float scale = 50.0;
    //rotate points with matrix maths and use time as angle
    mat4 outPoints;
    vec2 projectedPoints[points.length()];
    for (int i = 0; i < points.length(); ++i)
    {
        outPoints = mat4(points[i].x, points[i].y, points[i].z, 0, vec4(0), vec4(0), vec4(0));
        outPoints *= rotationY(angle) 
                * rotationX(angle) 
                * scaler(scale);
        
        projectedPoints[i] = vec2(outPoints[0].xy);
    }
    
    float colOut = 0.0;
    //Add lines to output value
    for (int i = 0; i < points.length(); ++i)
    {
        for (int j = 0; j < points.length(); ++j)
        {
            colOut += line(uv, projectedPoints[i].xy, projectedPoints[j].xy, 0.01);
        }
    }

    const vec3 backColour  = vec3(0.3);
    const vec3 lineColour1 = vec3(0.35,0.95,0.51);
    
    vec3 colour = mix(backColour, lineColour1, colOut);
    //Output colour per pixel
    fragColor = vec4(colour, 1.0);
}